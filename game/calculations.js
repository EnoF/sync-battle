const getHp = player => player.hp
const getStamina = player => () => player.stamina
const getMove = player => () => player.move
const getApplicableMove = (getMove, getStamina) => {
  if (getStamina() <= 0) return () => 'idle'
  return () => getMove()
}
const getDamage = (getMoveAttacker, getMoveDefender) => {
  if (getMoveAttacker() !== 'attack') return 0
  if (getMoveDefender() === 'block') return 0
  if (getMoveDefender() === 'dodge') return 0
  return 1
}
const isAttackBlocked = (getMoveAttack, getMoveBlock) => {
  if (getMoveAttack() !== 'attack') return false
  if (getMoveBlock() !== 'block') return false
  return true
}
const getStaminaConsumption = (getMoveConsumer, getMoveDefender) => () => {
  if (isAttackBlocked(getMoveConsumer, getMoveDefender)) return 2
  if (isAttackBlocked(getMoveDefender, getMoveConsumer)) return 2
  return 1
}
const getStaminaAfterConsumption = (getStamina, getStaminaConsumption) => {
  const result = getStamina() - getStaminaConsumption()
  if (result < 0) return 0
  return result
}
export const calculate = ({ p1, p2 }) => {
  const getP1Move = getApplicableMove(getMove(p1), getStamina(p1))
  const getP2Move = getApplicableMove(getMove(p2), getStamina(p2))
  return {
    p1: {
      hp: getHp(p1) - getDamage(getP2Move, getP1Move),
      stamina: getStaminaAfterConsumption(
        getStamina(p1),
        getStaminaConsumption(getP1Move, getP2Move)
      ),
    },
    p2: {
      hp: getHp(p2) - getDamage(getP1Move, getP2Move),
      stamina: getStaminaAfterConsumption(
        getStamina(p2),
        getStaminaConsumption(getP2Move, getP1Move)
      ),
    },
  }
}
