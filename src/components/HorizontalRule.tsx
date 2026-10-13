interface IHorizontalRule {
  type?: 'list' | 'section' | 'other'
}
export default function HorizontalRule(
  { type = 'other' }: IHorizontalRule
) {
  switch (type) {
    case "list":
      return <hr className="mx-4" />
    case "section":
      return <hr className="" />
    case "other":
      return <hr className="" />
    default:
      throw new Error("Tipo inválido.")
  }
}