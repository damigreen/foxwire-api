import Logger from '@ioc:Adonis/Core/Logger';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CreateUser from 'App/Repos/People/User/Create';

export default class UserSeeder extends BaseSeeder {
  public static async run() {
    // Write your database queries inside the run method    
    await new CreateUser().handle({
        name: 'Damilola Faseun',
        email: 'fashfired@gmail.com',
        password: 'password',
        roles: ['administrator'],
        phone: "07061935742",
        gender: "male"
    })
    

    Logger.info("UserSeeder: Seeded successfully!");
  }
}
