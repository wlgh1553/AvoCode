import { PickType } from "@nestjs/swagger";
import { User } from "@user/entities/user.entity";

class UserInfoDto extends PickType(User, ['id', 'name', 'experience']) {
    constructor(user: User) {
        super(user);
        
        this.id = user.id;
        this.name = user.name;
        this.experience = user.experience;
    }

    public id: string;
    public name: string;
    public experience: number;
}

export default UserInfoDto;