import { toast } from "react-toastify";

export function sendNotification(title, options, callback = null) {
  var notification = new Notification(title, options);

  notification.onclick = callback;
}

export function initializeNotification() {
  if (Notification.permission !== "granted") {
    toast.error(
      "Habilite as notificações para ser avisado a cada nova mensagem"
    );
  }
  Notification.requestPermission();
}
