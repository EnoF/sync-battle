const getHp = player => player.hp
export const calculate = ({ p1, p2 }) => {
  return {
    p1: {
      hp: getHp(p1) - 1,
      stamina: 4,
    },
    p2: {
      hp: getHp(p2) - 1,
      stamina: 4,
    },
  }
}
