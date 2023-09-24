import { debug, info } from 'veclog'
import { Request, Response, Router } from "express";
import { prisma } from "./util/prisma.client";
import { writeFileSync } from "fs";
import { convertToHtml } from 'mammoth'
import { AppError } from "./config/error";
export const router = Router()

router.get('/serie/:ref', async (req: Request, res: Response) => {
    const serieFound = await prisma.serie.findFirst({where: {ref: req.params.ref}})
    if (!serieFound) throw new AppError('Não achou serie')
    const eps = await prisma.ep.findMany({where: {serie_id: serieFound.id}})
    res.json(eps)
})
router.get('/serie/:ref/:num', async (req: Request, res: Response) => {
    const serieFound = await prisma.serie.findFirst({where: {ref: req.params.ref}})
    if (!serieFound) throw new AppError('Não achou serie')
    const eps = await prisma.ep.findMany({where: {serie_id: serieFound.id}})
    res.json(eps[parseInt(req.params.num) - 1].src)
})
router.get('/solo/:ref', async (req: Request, res: Response) => {
    const soloFound = await prisma.solo.findFirst({where: {ref: req.params.ref}})
    if (!soloFound) throw new AppError('Nao achou solo')
    res.json(soloFound.src)
})
router.post('/serie', async (req: Request, res: Response) => {
    const exists = await prisma.serie.findFirst({where: {ref: req.body.ref}})
    if (exists) {
        const newEp = await prisma.ep.create({data: {
            serie_id: exists.id,
            ep_number: req.body.num,
            ref: exists.ref,
            src: req.body.html,
        }})
        res.json(newEp)
    } else {
        const Serie = await prisma.serie.create({data: {
            ref: req.body.ref,
        }})
        const newEp = await prisma.ep.create({data: {
            serie_id: Serie.id,
            ep_number: req.body.num,
            ref: Serie.ref,
            src: req.body.html,
        }})
        res.json(newEp)
    }
})

router.post('/solo', async (req: Request, res: Response) => {
   const newSolo = await prisma.solo.create({data: {
    ref: req.body.ref,
    src: req.body.html
}})
    res.json(newSolo)
})