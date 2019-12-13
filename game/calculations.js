const getHp = player => () => player.hp
const getStamina = player => () => player.stamina
const getMove = player => () => player.move.type
const getPower = player => () => player.move.power || 1
const getIdleMove = () => 'idle'
const isAttack = getMove => getMove() === 'attack'
const isBlock = getMove => getMove() === 'block'
const isDodge = getMove => getMove() === 'dodge'
const isOutOfStaminaAfterMove = (getStamina, getConsumption) => getStamina() < getConsumption()
const isOutOfStaminaAfterBlock = (getMoveOpponent, getMoveDefender, getPower, getStamina) =>
  isAttack(getMoveOpponent) && isBlock(getMoveDefender) && isOutOfStaminaAfterMove(getStamina, () => getPower() + 1)
const isMoveApplicable = (getMove, getPower, getMoveOpponent, getStamina) => {
  if (isOutOfStaminaAfterMove(getStamina, getPower)) return false
  if (isOutOfStaminaAfterBlock(getMoveOpponent, getMove, getPower, getStamina)) return false
  return true
}
const getApplicableMove = (player, opponent) => () => {
  const getPlayerMove = getMove(player)
  if (isMoveApplicable(getPlayerMove, getPower(player), getMove(opponent), getStamina(player))) return getPlayerMove()
  return getIdleMove()
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
  isAttackBlocked(getMoveConsumer, getMoveDefender) || isAttackBlocked(getMoveDefender, getMoveConsumer)
const getStaminaConsumption = (consumer, defender) => () => {
  const getMoveConsumer = getApplicableMove(consumer, defender)
  const getMoveDefender = getApplicableMove(defender, consumer)
  const getPowerConsumer = getPower(consumer)
  const getPowerDefender = getPower(defender)
  if (isEitherAttackBlocked(getMoveDefender, getMoveConsumer)) return getPowerConsumer() + getPowerDefender()
  return getPowerConsumer()
}
const subTractToMinimumOfZero = (getX, getY) => {
  const result = getX() - getY()
  if (result < 0) return 0
  return result
}
const getStaminaAfterConsumption = (player, opponent) => {
  const getStaminaOfPlayer = getStamina(player)
  const getPlayerStaminaConsumption = getStaminaConsumption(player, opponent)
  if (getStaminaOfPlayer() < getPlayerStaminaConsumption()) return getStaminaOfPlayer()
  return subTractToMinimumOfZero(getStaminaOfPlayer, getPlayerStaminaConsumption)
}
const getHpAfterDamage = (getHp, getDamage) => subTractToMinimumOfZero(getHp, getDamage)
export const calculate = ({ p1, p2 }) => {
  const getP1Move = getApplicableMove(p1, p2)
  const getP2Move = getApplicableMove(p2, p1)
  return {
    p1: {
      hp: getHpAfterDamage(getHp(p1), getPoweredDamage(getDamage(getP2Move, getP1Move), getPower(p2))),
      stamina: getStaminaAfterConsumption(p1, p2),
    },
    p2: {
      hp: getHpAfterDamage(getHp(p2), getPoweredDamage(getDamage(getP1Move, getP2Move), getPower(p1))),
      stamina: getStaminaAfterConsumption(p2, p1),
    },
  }
}
