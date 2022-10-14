import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {PgDataSource} from '../datasources';
import {User, UserRelations, Customer, Role} from '../models';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly customer: BelongsToAccessor<
    Customer,
    typeof User.prototype.id
  >;

  public readonly Role: BelongsToAccessor<Role, typeof User.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.Role = this.createBelongsToAccessorFor('Role', roleRepositoryGetter);
    this.registerInclusionResolver('Role', this.Role.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor(
      'customer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
