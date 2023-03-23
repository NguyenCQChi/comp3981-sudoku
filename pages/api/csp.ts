// Solving CSP

export default function handler(req: any, res: any) {
  console.log(req.body.value[0])
  res.status(200).json({ name: 'John Doe' })
}
