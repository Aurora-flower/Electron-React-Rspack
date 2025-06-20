interface Button {
  render(): void
}

class PrimaryButton implements Button {
  render(): void {
    console.log("Rendering primary button")
  }
}

class SecondaryButton implements Button {
  render(): void {
    console.log("Rendering secondary button")
  }
}

export class ButtonFactory {
  static createButton(type: string): Button {
    if (type === "primary") {
      return new PrimaryButton()
    } else if (type === "secondary") {
      return new SecondaryButton()
    } else {
      throw new Error("Unknown button type")
    }
  }
}
