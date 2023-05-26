import {useState} from "react";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import clientImage from "../../../public/client.png";
import freelancerImage from "../../../public/freelancer.png";
import {UserRole} from "../../../types/resolvers";

type CardProps = {
    label: string;
    imageSrc: StaticImageData;
    selected: boolean;
    onClick: () => void;
};

const Card = ({label, imageSrc, selected, onClick}: CardProps) => {
    return (
        <div
            className={`flex items-center justify-center flex-col p-4 rounded-lg cursor-pointer border ${
                selected ? "border-green-500" : "border-newColor"
            }`}
            onClick={onClick}
        >
            <div
                className={`w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center my-2 ${
                    selected ? "bg-primary border-primary" : ""
                }`}
            >
                {selected && <div className="w-3 h-3 rounded-full bg-white"/>}
            </div>
            <Image src={imageSrc} alt={label} className="w-8 h-8 mt-2 my-6"/>
            <span className="font-medium text-xl text-second">{label}</span>
        </div>
    );
};

type ProfileTypeStepProps = {
    onSelect: (type: string) => void;
};

const ProfileTypeStep = ({onSelect}: ProfileTypeStepProps) => {
    const [profileType, setProfileType] = useState<UserRole | null>(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleProfileTypeSelect = (type: UserRole) => {
        setProfileType(type);
        setButtonDisabled(false);
    };

    const handleNext = () => {
        if (profileType) {
            onSelect(profileType);
        }
    };

    return (
        <div
            className="flex flex-col items-center my-14 rounded-lg border border-newColor"
            style={{width: "780px", height: "420px"}}
        >
            <h2 className="text-3xl font-semibold text-second my-6 py-4 mb-4">
                Join as a client or freelancer
            </h2>
            <div className="flex space-x-4">
                <Card
                    label="I’m a freelancer, looking for work"
                    imageSrc={freelancerImage}
                    selected={profileType === UserRole.Freelancer}
                    onClick={() => handleProfileTypeSelect(UserRole.Freelancer)}
                />
                <Card
                    label="I’m a client, hiring for a project"
                    imageSrc={clientImage}
                    selected={profileType === UserRole.Client}
                    onClick={() => handleProfileTypeSelect(UserRole.Client)}
                />
            </div>
            <div className="my-12">
                <button
                    className="py-2 px-20 rounded-full font-medium text-base text-white bg-primary"
                    onClick={handleNext}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled
                        ? "Create Account"
                        : profileType === UserRole.Freelancer
                            ? "Apply as a Freelancer"
                            : "Join as a Client"}
                </button>
                <p className="font-normal my-2 mx-7 text-second">
                    Already have an account ? <Link href="/signin" className="text-primary">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default ProfileTypeStep;
