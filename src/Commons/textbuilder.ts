export function getOpenCloseText(isContactOpen: boolean): string {
  return `${isContactOpen ? "Open" : "Close"}`;
}

export function getDeadlockText(isLock: boolean): string {
  return `${isLock ? "Lock" : "Unlock"}`;
}

export function getTVText(isTvOn: boolean): string {
  return `${isTvOn ? "On" : "Off"}`;
}

export function getMotionText(isInMotion: boolean): string {
  return `${isInMotion ? "Motion" : "No Motion"} `;
}

export function getWashingMachineText(isInPower: boolean): string {
  return `${isInPower ? "On" : "Off"}`;
}

export function getAirPurifierText(isInPower: boolean): string {
  return `${isInPower ? "Air On" : "Air Off"}`;
}

export function getProjectionText(isOn: boolean): string {
  return `${isOn ? "On" : "Stars Off"}`;
}