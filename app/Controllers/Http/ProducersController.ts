import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producer from 'App/Models/Producer'

interface Iresponse {
  data: Producer[]
  errors: String[]
}

export default class ProducersController {
  protected response: Iresponse

  constructor() {
    this.response = {
      data: [],
      errors: [],
    }
  }

  public async index({ response }: HttpContextContract) {
    const producers = await Producer.all()

    const data: Producer[] = []

    producers.forEach(
      ({ id, farmName, producerName, state, cultures, arableArea, vegetationArea, totalArea }) => {
        const producer = new Producer()

        producer.id = id
        producer.farmName = farmName
        producer.producerName = producerName
        producer.state = state
        producer.cultures = JSON.parse(cultures)
        producer.arableArea = arableArea
        producer.vegetationArea = vegetationArea
        producer.totalArea = totalArea

        data.push(producer)
      }
    )

    this.response.data = data

    response.status(200).json(this.response)
  }

  public async show({ params, response }: HttpContextContract) {
    const producer = await Producer.find(params.id)

    if (producer) {
      producer.cultures = JSON.parse(producer.cultures)
      this.response.data = [producer]
    } else {
      this.response.errors = ['Producer not found.']
    }

    response.status(200).json(this.response)
  }

  public async store({ request, response }: HttpContextContract) {
    const {
      id,
      cpf,
      cnpj,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      cultures,
    } = request.post()

    const producer = id ? await Producer.find(id) : new Producer()

    if (!producer) return

    if (id) producer.id = id
    if (cpf) producer.cpf = cpf
    if (cnpj) producer.cnpj = cnpj
    producer.producerName = producerName
    producer.farmName = farmName
    producer.city = city
    producer.state = state
    producer.totalArea = totalArea
    producer.arableArea = arableArea
    producer.vegetationArea = vegetationArea
    producer.cultures = JSON.stringify(cultures)

    console.log(producer.id)

    await producer.save()

    response.status(200)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const producer = await Producer.find(params.id)

    await producer?.delete()

    response.status(200)
  }
}
