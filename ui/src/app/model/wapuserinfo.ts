import { UserTokenInfo } from "app/model/usertokeninfo";
import { OfficeInfo } from "app/model/officeinfo";
import { UserProfile, ResearchExperience, TeachingExperience, CommendationExperience } from "app/model/userinfo";
import { Combobox } from "app/model/combobox";

export class WapUserInfo {
    usertokeninfo: UserTokenInfo;
    userprofile = new UserProfile();
    username: string;

    lstGroup: OfficeInfo[];
    groupSelected = new OfficeInfo();
    lstDepartment = new Array<OfficeInfo>();
    departmentSelected = new OfficeInfo();
    research_areaSelected: any;
    lstacademic_rank: any;
    academic_rankSelected: any;
    lstdegree: any;
    degreeSelected: any;
    lstresearch_area: any;
    isloadpage: boolean;
    research_topic: any;
    scientific_association?: string[];

    lst_office = new Array<Object>();
    lst_officeSelected: any;

    research_experience?: ResearchExperience[];
    teaching_experience?: TeachingExperience[];
    commendation_experience?: CommendationExperience[];

}