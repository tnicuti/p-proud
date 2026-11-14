/**
 * Mã thiết bị ẩn danh (chuỗi ngẫu nhiên trong localStorage). Dùng để giới hạn tần suất
 * và để mỗi thiết bị chỉ thích một lần. Không gắn với danh tính người dùng.
 */
const DEVICE_KEY = "pproud:device";

export function deviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}
