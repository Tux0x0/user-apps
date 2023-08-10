let App = {}
App.chatCommands = {}

App.onEventReceived = (user, type, data, session) => {
	// Auch der Klick auf das rote Kästchen im Channel beendet den Bot.
	if (typeof type === "string" && type === "close" && session)
		return session.remove()
}

App.chatCommands.min = (user, param) => {
	// Den Befehl /min kann jeder in deinem Channel ausführen.
	// /min on startet den Minutenbot.
	// /min off beendet den Minutenbot.

	const content = AppContent.overlayContent(new HTMLFile("index.html"), 20, 20)
	const info = "°BB>/min on|/min on<°°r° startet den Minutenbot, °BB>_h/min off|/min off<°°r° beendet ihn."

	switch (param.toLowerCase()) {
		case "on":
			if (user.canSendAppContent(content) && !user.getAppContentSession(AppViewMode.Overlay))
				return user.sendAppContent(content)
		case "off":
			if (user.getAppContentSession(AppViewMode.Overlay))
				return user.getAppContentSession(AppViewMode.Overlay).remove()
		default:
			user.sendPrivateMessage(info)
	}
}