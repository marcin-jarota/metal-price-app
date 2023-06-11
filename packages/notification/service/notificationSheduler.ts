import { createClient } from 'redis';
import type { NotificationSheduler, Notification } from '../types'

export const buildNotificationSheduler = async (): Promise<NotificationSheduler> => {
    const KEY = 'notifications:list'

    const client = createClient()

    await client.connect()

    return {
        popNotification: async () => {
            const notification = await client.lPop(KEY)

            if (!notification) return null

            try {
                return JSON.parse(notification) as Notification
            } catch (err) {
                return null
            }
        },
        pushNotification: async (n: Notification) => {
          return client.lPush(KEY, JSON.stringify(n))
        }
    }
}