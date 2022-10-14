import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import { authorize } from 'loopback4-authorization';
import {
  Customer,
  User
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerUserController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['getCustomerUsers']})
  @get('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Customer has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.customerRepository.users(id).find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['createCustomerUser']})
  @post('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.customerRepository.users(id).create(user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['updateCustomerUser']})
  @patch('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerRepository.users(id).patch(user, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['deleteCustomerUser']})
  @del('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerRepository.users(id).delete(where);
  }
}
