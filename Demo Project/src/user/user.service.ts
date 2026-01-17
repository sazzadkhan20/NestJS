import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
  // Inject Hello Service
  // export HelloService from HelloModule
  // import HelloModule in UserModule
  constructor(private readonly helloService: HelloService) {}

  getAllUser() {
    return [
      {
        id: 1,
        Name: 'Md Sazzad Khan',
      },
      {
        id: 2,
        Name: 'Jon',
      },
      {
        id: 3,
        "Name": 'Pappu',
      },
    ];
  }

  getUserById(id: number) {
    const user = this.getAllUser().find((user) => user.id === id); // if no user found return undefined
    if (user == null) return 'No User Found'; // catch both null & undefined
    return user;
  }

  getWelcomeMessage(id: number) {
    const user = this.getUserById(id);
    if (user == 'No User Found') return this.helloService.getWelcomeWithName('');
    return this.helloService.getWelcomeWithName(user.Name);
  }
}
