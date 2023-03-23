// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req: any, res: any) {
  console.log(req.body.value[0])
  res.status(200).json({ name: 'John Doe' })
}

