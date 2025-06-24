/**
 * @file 命令模式 - Command Pattern
 * @description 将执行特定任务的对象与调用该方法的对象解耦。
 */

interface Order {
  id: string
  name?: string
  status: "processing" | "completed" | "cancelled" | "pending"
}
type OrderList = Array<Order>

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

type Executor<T> = (orders: T, ...args: unknown[]) => void

class CommandExecutor<T> {
  execute: Executor<T>

  constructor(execute: Executor<T>) {
    this.execute = execute
  }
}

type OrderCommandExecutor = CommandExecutor<OrderList>

class OrderManager {
  private orders: OrderList
  constructor() {
    this.orders = []
  }

  executeCommand(command: OrderCommandExecutor, ...args: unknown[]): any {
    return command.execute(this.orders, ...args)
  }
}

// function PlaceOrderCommand(order: Order, id: string): OrderCommandExecutor {
//   return new CommandExecutor((orders: OrderList) => {
//     orders.push({ id, status: "pending" })
//     return `You have successfully ordered ${order} (${id})`
//   })
// }

class PlaceOrderCommand implements OrderCommandExecutor {
  constructor(
    private order: Order,
    private id: string
  ) {}

  execute(orders: OrderList): void {
    orders.push({ id: this.id, status: "pending" })
    console.log(`成功下单 ${this.order.name} (${this.id})`)
  }
}

const manager = new OrderManager()
manager.executeCommand(
  new PlaceOrderCommand(
    {
      status: "pending",
      name: "测试",
      id: "1234"
    },
    "1234"
  )
)

export default OrderManager
