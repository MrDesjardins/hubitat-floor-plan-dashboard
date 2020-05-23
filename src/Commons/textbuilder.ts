export function getOpenCloseText(isContactOpen: boolean): string {
  return `${isContactOpen ? "Open" : "Close"}`;
}

export function getDeadlockText(isLock: boolean): string {
  return `${isLock ? "Lock" : "Unlock"}`;
}

export function getTVText(isTvOn: boolean): string {
  return `${isTvOn ? "On" : "Off"}`;
}
