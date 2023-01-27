import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useNavigateSignIn } from "../hooks";
import { getMyStories } from "../../services/tuys";
import { toast } from "../utils/Toast";
import { StoryType } from "../utils/Protocols";
import { Icons } from "../utils/Icons";
import { Title } from "../shared";
import { Story } from "./Story";
import { Wrapper } from "./Stories";

export function UserStories() {
	const [stories, setStories] = useState<StoryType[]>([]);
	const { theme } = useThemeContext();
	const { state: location } = useLocation();
	const goSignIn = useNavigateSignIn();

	useEffect(() => {
		if (!location?.userId) {
			getMyStories()
				.then((stories) => setStories(stories))
				.catch(({ response }) => {
					if (response.status === 401) {
						return goSignIn();
					}

					toast({
						theme: theme.name,
						type: "error",
						text: response?.data?.message,
					});
				});
			return;
		}
	}, [location?.userId]);

	return (
		<Wrapper>
			<Title>
				<Icons type="stories" /> Contos
			</Title>

			<div>
				{stories.map((story, index) => (
					<Story key={index} story={story} showChannel={true} />
				))}
			</div>
		</Wrapper>
	);
}
