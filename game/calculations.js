const getHp = player => () => player.hp
const getStamina = player => () => player.stamina
const getMove = player => () => player.move.type
const getPower = player => () => player.move.power || 1
const isAttack = getMove => getMove() === 'attack'
const isBlock = getMove => getMove() === 'block'
const isDodge = getMove => getMove() === 'dodge'
const isOutOfStamina = getStamina => getStamina() <= 0
const isOutOfStaminaAfterMove = (getStamina, getConsumption) =>
  getStamina() < getConsumption()
const isOutOfStaminaAfterBlock = (
  getMoveOpponent,
  getMoveDefender,
  getPower,
  getStamina
) =>
  isAttack(getMoveOpponent) &&
  isBlock(getMoveDefender) &&
  isOutOfStaminaAfterMove(getStamina, () => getPower() + 1)
const getApplicableMove = (
  getMove,
  getPower,
  getMoveOpponent,
  getStamina
) => () => {
  if (isOutOfStamina(getStamina)) return 'idle'
  if (isOutOfStaminaAfterMove(getStamina, getPower)) return 'idle'
  if (isOutOfStaminaAfterBlock(getMoveOpponent, getMove, getPower, getStamina))
    return 'idle'
  return getMove()
}
const getDamage = (getMoveAttacker, getMoveDefender) => () => {
  if (!isAttack(getMoveAttacker)) return 0
  if (isBlock(getMoveDefender)) return 0
  if (isDodge(getMoveDefender)) return 0
  return 1
}
const getPoweredDamage = (getDamage, getPower) => () => getDamage() * getPower()
const isAttackBlocked = (getMoveAttack, getMoveBlock) => {
  if (!isAttack(getMoveAttack)) return false
  if (!isBlock(getMoveBlock)) return false
  return true
}
const isEitherAttackBlocked = (getMoveConsumer, getMoveDefender) =>
  isAttackBlocked(getMoveConsumer, getMoveDefender) ||
  isAttackBlocked(getMoveDefender, getMoveConsumer)
const getStaminaConsumption = (
  getMoveConsumer,
  getPowerConsumer,
  getMoveDefender,
  getPowerDefender
) => () => {
  if (isEitherAttackBlocked(getMoveDefender, getMoveConsumer))
    return getPowerConsumer() + getPowerDefender()
  return getPowerConsumer()
}
const subTractToMinimumOfZero = (getX, getY) => {
  const result = getX() - getY()
  if (result < 0) return 0
  return result
}
const getStaminaAfterConsumption = (getStamina, getStaminaConsumption) => {
  if (getStamina() < getStaminaConsumption()) return getStamina()
  return subTractToMinimumOfZero(getStamina, getStaminaConsumption)
}
const getHpAfterDamage = (getHp, getDamage) =>
  subTractToMinimumOfZero(getHp, getDamage)
export const calculate = ({ p1, p2 }) => {
  const getP1Move = getApplicableMove(
    getMove(p1),
    getPower(p1),
    getMove(p2),
    getStamina(p1)
  )
  const getP2Move = getApplicableMove(
    getMove(p2),
    getPower(p2),
    getMove(p1),
    getStamina(p2)
  )
  return {
    p1: {
      hp: getHpAfterDamage(
        getHp(p1),
        getPoweredDamage(getDamage(getP2Move, getP1Move), getPower(p2))
      ),
      stamina: getStaminaAfterConsumption(
        getStamina(p1),
        getStaminaConsumption(getP1Move, getPower(p1), getP2Move, getPower(p2))
      ),
    },
    p2: {
      hp: getHpAfterDamage(
        getHp(p2),
        getPoweredDamage(getDamage(getP1Move, getP2Move), getPower(p1))
      ),
      stamina: getStaminaAfterConsumption(
        getStamina(p2),
        getStaminaConsumption(getP2Move, getPower(p2), getP1Move, getPower(p1))
      ),
    },
  }
}
