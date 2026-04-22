const WHATSAPP_NUMBER = '917385000000' // Replace with real number

export const generateWhatsAppOrderMessage = (order) => {
  const items = order.items?.map(item =>
    `• ${item.name} x${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
  ).join('\n') || ''

  const customization = order.customization
    ? `\n📝 *Customization:*\n• Name: ${order.customization.name || 'N/A'}\n• Theme: ${order.customization.theme || 'N/A'}\n• Note: ${order.customization.note || 'N/A'}`
    : ''

  const message = `🎁 *New Order — Hamper Rush*

🔖 *Order ID:* #${order.orderId || 'PENDING'}
👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.phone}
📍 *Address:* ${order.address}, ${order.city} — ${order.pincode}

🛍️ *Items:*
${items}

💰 *Total: ₹${order.total?.toLocaleString('en-IN')}*
💳 *Payment:* ${order.paymentMethod === 'cod' ? 'COD Inquiry' : 'Online Payment'}
${customization}

Please confirm my order. Thank you! 🙏`

  return encodeURIComponent(message)
}

export const openWhatsApp = (message) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
  window.open(url, '_blank')
}

export const openWhatsAppDirect = (text) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
}

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`
