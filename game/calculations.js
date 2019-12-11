const getHp = player => () => player.hp
const getStamina = player => () => player.stamina
const getMove = player => () => player.move
const isAttack = getMove => getMove() === 'attack'
const isBlock = getMove => getMove() === 'block'
const isDodge = getMove => getMove() === 'dodge'
const isOutOfStamina = getStamina => getStamina() <= 0
const isOutOfStaminaAfterMove = getStamina => getStamina() <= 1
const isOutOfStaminaAfterBlock = (
  getMoveOpponent,
  getMoveDefender,
  getStamina
) =>
  isAttack(getMoveOpponent) &&
  isBlock(getMoveDefender) &&
  isOutOfStaminaAfterMove(getStamina)
const getApplicableMove = (getMove, getMoveOpponent, getStamina) => () => {
  if (isOutOfStamina(getStamina)) return 'idle'
  if (isOutOfStaminaAfterBlock(getMoveOpponent, getMove, getStamina))
    return 'idle'
  return getMove()
}
const getDamage = (getMoveAttacker, getMoveDefender) => () => {
  if (!isAttack(getMoveAttacker)) return 0
  if (isBlock(getMoveDefender)) return 0
  if (isDodge(getMoveDefender)) return 0
  return 1
}
const isAttackBlocked = (getMoveAttack, getMoveBlock) => {
  if (!isAttack(getMoveAttack)) return false
  if (!isBlock(getMoveBlock)) return false
  return true
}
const isEitherAttackBlocked = (getMoveConsumer, getMoveDefender) =>
  isAttackBlocked(getMoveConsumer, getMoveDefender) ||
  isAttackBlocked(getMoveDefender, getMoveConsumer)
const getStaminaConsumption = (getMoveConsumer, getMoveDefender) => () => {
  if (isEitherAttackBlocked(getMoveDefender, getMoveConsumer)) return 2
  return 1
}
const subTractToMinimumOfZero = (getX, getY) => {
  const result = getX() - getY()
  if (result < 0) return 0
  return result
}
const getStaminaAfterConsumption = (getStamina, getStaminaConsumption) =>
  subTractToMinimumOfZero(getStamina, getStaminaConsumption)
const getHpAfterDamage = (getHp, getDamage) =>
  subTractToMinimumOfZero(getHp, getDamage)
export const calculate = ({ p1, p2 }) => {
  const getP1Move = getApplicableMove(getMove(p1), getMove(p2), getStamina(p1))
  const getP2Move = getApplicableMove(getMove(p2), getMove(p1), getStamina(p2))
  return {
    p1: {
      hp: getHpAfterDamage(getHp(p1), getDamage(getP2Move, getP1Move)),
      stamina: getStaminaAfterConsumption(
        getStamina(p1),
        getStaminaConsumption(getP1Move, getP2Move)
      ),
    },
    p2: {
      hp: getHpAfterDamage(getHp(p2), getDamage(getP1Move, getP2Move)),
      stamina: getStaminaAfterConsumption(
        getStamina(p2),
        getStaminaConsumption(getP2Move, getP1Move)
      ),
    },
  }
}
