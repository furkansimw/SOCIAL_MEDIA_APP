export default (
  userlist: string
) => `left join relationships b on b.type = 2 and (
    (b.owner = $1 AND b.target IN (${userlist})) or (b.target = $1 AND b.owner IN (${userlist})))`;
