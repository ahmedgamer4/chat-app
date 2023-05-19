import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupsService {
    private groupsRepo;
    constructor(groupsRepo: Repository<Group>);
    getAllGroups(): Promise<Group[]>;
    getAllGroupsWithLimit(limit: number): Promise<Group[]>;
    createGroup(createGroupDto: CreateGroupDto): Promise<Group>;
    getGroupByName(name: string): Promise<Group>;
    getGroupById(id: number): Promise<Group>;
    addMessage(group_id: number, updateGroupDto: UpdateGroupDto): Promise<import("typeorm").UpdateQueryBuilder<Group>>;
    updateGroup(group_id: number, updateGroupDto: UpdateGroupDto): Promise<Group>;
    deleteGroups(): Promise<import("typeorm").DeleteResult>;
}
