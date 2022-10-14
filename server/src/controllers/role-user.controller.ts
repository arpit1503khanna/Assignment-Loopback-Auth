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
  Role,
  User
} from '../models';
import {RoleRepository} from '../repositories';

export class RoleUserController {
  constructor(
    @repository(RoleRepository) protected roleRepository: RoleRepository,
  ) { }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['getRoleUsers']})
  @get('/roles/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Role has many User',
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
    return this.roleRepository.users(id).find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['createRoleUser']})
  @post('/roles/{id}/users', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Role.prototype.key,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInRole',
            exclude: ['id'],
            optional: ['rolekey']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.roleRepository.users(id).create(user);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['updateRoleUser']})
  @patch('/roles/{id}/users', {
    responses: {
      '200': {
        description: 'Role.User PATCH success count',
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
    return this.roleRepository.users(id).patch(user, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['deleteRoleUser']})
  @del('/roles/{id}/users', {
    responses: {
      '200': {
        description: 'Role.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.roleRepository.users(id).delete(where);
  }
}
