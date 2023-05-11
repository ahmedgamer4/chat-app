import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
export declare class GroupsController {
    private groupsService;
    constructor(groupsService: GroupsService);
    getAllGroups(): Promise<Group[]>;
    getGroupById(id: number): Promise<Group>;
    createGroup(createGroupDto: CreateGroupDto): Promise<Group>;
}
