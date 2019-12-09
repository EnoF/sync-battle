const getHp = player => player.hp
const getStamina = player => player.stamina
export const calculate = ({ p1, p2 }) => {
  return {
    p1: {
      hp: getHp(p1) - 1,
      stamina: getStamina(p1) - 1,
    },
    p2: {
      hp: getHp(p2) - 1,
      stamina: getStamina(p2) - 1,
    },
  }
}
