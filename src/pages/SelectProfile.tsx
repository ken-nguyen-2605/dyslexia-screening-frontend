import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProfileSelectItem from "../components/ProfileSelectItem";

const SelectProfile = () => {
	const navigate = useNavigate();
	const { user, selectProfile } = useAuth();
	return (
		<div className="flex flex-col flex-grow items-center justify-center bg-gradient-pink rounded-2xl p-8 shadow-lg">
			<h1 className="text-3xl text-pink-600 font-bold mb-2">
				Select Profile
			</h1>

			{user?.profiles && user.profiles.length > 0 ? (
				<>
					<h2 className="text-lg text-gray-700 mb-4">
						Please select a profile to continue.
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full lg:max-w-4xl">
						{user.profiles.map((profile) => (
							<ProfileSelectItem
                key={profile.id}
                profile={profile}
                onSelect={async () => {
                  try {
                    await selectProfile(profile.id);
                    navigate("/"); // Redirect to home or dashboard after selection
                  } catch (error) {
                    console.error("Profile selection error:", error);
                    alert("Failed to select profile. Please try again.");
                  }
                }}
              />
						))}
					</div>
				</>
			) : (
				<p className="text-gray-600">
					No profiles found. Please create a profile first.
				</p>
			)}
		</div>
	);
};

export default SelectProfile;
