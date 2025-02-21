# Powershell 运行脚本权限问题

## 引言

在 PowerShell 中运行脚本时遇到权限问题，通常是由于系统的**执行策略（Execution Policy）**限制导致的。

---

### **1. 错误现象**

当尝试运行脚本（如 `.ps1` 文件或某些命令）时，可能看到以下错误：

```powershell
File XXX.ps1 cannot be loaded because running scripts is disabled on this system.
无法加载文件 C:\Users\User\AppData\Roaming\npm\appium-doctor.ps1，因为在此系统上禁止运行脚本。
+ CategoryInfo : SecurityError: (:) [], PSSecurityException
+ FullyQualifiedErrorId : UnauthorizedAccess
```

---

### **2. 原因分析**

Windows 默认的 PowerShell 执行策略为 **`Restricted`**，禁止运行任何脚本，以防止恶意脚本执行。需要调整执行策略以允许脚本运行。

---

### **3. 解决方案**

#### **(1) 临时更改执行策略（推荐）**

以 **管理员身份** 运行 PowerShell，输入以下命令临时允许当前会话运行脚本：

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

- **说明**：此命令仅对当前 PowerShell 窗口生效，关闭后恢复默认策略，安全性较高。

#### **(2) 永久更改执行策略**

如果需要长期允许脚本运行，以管理员身份执行：

```powershell
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
```

- **参数解释**：
  - **`RemoteSigned`**：允许运行本地脚本，但远程下载的脚本必须经过数字签名。
  - **`LocalMachine`**：对所有用户生效。

#### **(3) 单次绕过策略运行脚本**

直接为某次脚本运行临时绕过策略（无需管理员权限）：

```powershell
powershell -ExecutionPolicy Bypass -File "的脚本路径.ps1"
```

#### **(4) 检查当前执行策略**

查看当前策略设置：

```powershell
Get-ExecutionPolicy
```

---

### **4. 权限不足的其他可能**

如果上述方法无效，还需检查：

1. **脚本路径权限**：确保有权限访问脚本所在目录。
2. **文件签名**：如果脚本来自外部，尝试右键点击文件 → **属性** → 勾选 **解除锁定**。
3. **管理员身份运行**：某些脚本需要管理员权限，右键点击 PowerShell 图标 → **以管理员身份运行**。

---

### **5. 安全注意事项**

- **不要滥用 `Unrestricted`**：避免使用 `Set-ExecutionPolicy Unrestricted`，这会完全禁用安全限制。
- **谨慎运行未知脚本**：仅信任来源可靠的脚本，避免直接运行从网络下载的未签名脚本。
