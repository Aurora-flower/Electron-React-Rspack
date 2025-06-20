/**
 * @file 命令模式 - Command Pattern
 * @description 将执行特定任务的对象与调用该方法的对象解耦。
 */

interface Order {
  id: string
  status: "processing" | "completed" | "cancelled" | "pending"
}

/**
 * @summary 示例：在线食品配送平台，支持下订单、跟踪和取消订单
 */

/* ***** ***** 常规写法 ***** *****  */
export class GeneralOrderManager {
  private orders: Order[] = []

  placeOrder(order: Order): void {
    this.orders.push(order)
  }

  cancelOrder(orderId: string): void {
    const index = this.orders.findIndex(order => order.id === orderId)
    if (index !== -1) {
      this.orders[index].status = "cancelled"
      console.log(`已取消订单 ${orderId}`)
    } else {
      console.log(`未找到订单 ${orderId}`)
    }
  }

  trackOrder(orderId: string): void {
    const order = this.orders.find(order => order.id === orderId)
    if (order?.status === "pending") {
      console.log(`订单 ${orderId} 正在等待处理`)
    } else if (order?.status === "processing") {
      console.log(`正在处理订单 ${orderId}`)
    } else if (order?.status === "completed") {
      console.log(`订单 ${orderId} 已完成`)
    } else if (order?.status === "cancelled") {
      console.log(`订单 ${orderId} 已取消`)
    } else {
      console.log(`未找到订单 ${orderId}`)
    }
  }
}

const generalOrderManager = new GeneralOrderManager()
const order: Order = { id: "1", status: "pending" }
generalOrderManager.placeOrder(order)
generalOrderManager.trackOrder(order.id)
generalOrderManager.cancelOrder(order.id)

/* ***** ***** 命令模式 ***** *****  */

class OrderManager {
  private orders: Order[]

  constructor() {
    this.orders = []
  }
}

export default OrderManager
