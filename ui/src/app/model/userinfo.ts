export class UserInfo {
    _id: string;
    username: string;
    password: string;
    retypepassword: string;
    user_type: number;
    work_roles: string[];
    family_name: string;
    middle_name: string;
    first_name: string;
    gender: number;
    birthday: number;
    sbirthday?: string;
    academic_rank: number;
    degree: number;
    mobile: string;
    address: string;
    research_area: number;
    research_topic?: string[];
    scientific_association?: string[];
    research_experience?: ResearchExperience[];
    teaching_experience?: TeachingExperience[];
    commendation_experience?: CommendationExperience[];
    homepage?: string[];

}
export class UserProfile {
    _id: string;
    username: string;
    family_name: string;
    middle_name: string;
    first_name: string;
    gender: number;
    birthday: number;
    academic_rank: number;
    degree: number;
    mobile: string;
    address: string;
    research_area: number;
    scientific_association?: string[];
    full_name: string;
    updated_at: Date;
    created_at: Date;
    commendation_experience?: CommendationExperience[];
    teaching_experience?: TeachingExperience[];
    research_experience: ResearchExperience[];
    research_topic?: string[];
    isActived: boolean;
    homepage?: string[];
    user_type: number;
    website: string;

    work_roles: string[];
    constructor() {
        this.full_name = "";
    }
}
export class ResearchExperience {
    name: string;
    work_place: string;
    date_from: string;
    date_to: string;
    address: string;
    role: string;
}

export class TeachingExperience {
    name: string;
    work_place: string;
    date_from: string;
    date_to: string;
    address: string;
    role: string;
}

export class CommendationExperience {
    name: string;
    decision: string;
    date: string;
    level: string;
    content: string;
}

export class ChangePassword {
    oldPassword: string;
    newPassword: string;
    reNewPassword: string;
}