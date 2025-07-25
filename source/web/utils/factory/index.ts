interface Button {
  render(): void
}

class PrimaryButton implements Button {
  render(): void {}
}

class SecondaryButton implements Button {
  render(): void {}
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
