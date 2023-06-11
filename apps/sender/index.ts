import express from "express";
import cron from "node-cron";
import nodemailer from "nodemailer";
import { buildNotificationSheduler } from "notification/service/notificationSheduler";
import type { NotificationSheduler, Notification } from "notification/types";
const app = express();

const init = async () => {
  const sheduler = await buildNotificationSheduler();

  //send email after 1 minute
  const job = cron.schedule("* * * * *", function() {
    sendNotifications(sheduler);
  });

  job.start();
};

const sendNotifications = async (sheduler: NotificationSheduler) => {
  let notification: Notification | null;

  do {
    notification = await sheduler.popNotification();
    if (
      !notification?.stakeholdersEmails ||
      !notification.stakeholdersEmails?.length
    ) {
      continue;
    }

    for (let i = 0; i < notification?.stakeholdersEmails?.length; i++) {
      const to = notification?.stakeholdersEmails[i];

      await sendMail({
        from: "price-notifier@gmail.com",
        to,
        subject: notification?.title,
        text: notification?.content,
      });
    }
  } while (notification);
};

const sendMail = (body: any) =>
  new Promise((res, rej) => {
    let mailTransporter = nodemailer.createTransport({
      port: 1025,
    });
    mailTransporter.sendMail(body, function(err, data) {
      if (err) {
        console.log("error occurred", err.message);
        rej(err);
        return;
      }

      console.log("---------------------");
      console.log("email sent successfully");
      res(true);
    });
  });

init();

app.listen(3002, () => {
  console.log("[SENDER]: listening for sending emails");
});
