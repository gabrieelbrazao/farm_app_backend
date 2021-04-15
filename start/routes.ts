import Route from '@ioc:Adonis/Core/Route'

Route.get('/producers', 'ProducersController.index')

Route.get('/producers/:id', 'ProducersController.show')

Route.post('/producers', 'ProducersController.store')

Route.delete('/producers/:id', 'ProducersController.destroy')
