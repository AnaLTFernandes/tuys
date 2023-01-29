import api from "../../services/tuys";
import { useRequestQuery, useToast } from "../hooks";
import { Story } from "./Story";
import { Wrapper } from "./Stories";
import { RequestKeyEnum } from "../utils/enums";

export function HomeStories() {
	const toast = useToast();

	const {
		isError,
		isSuccess,
		data: stories,
		...request
	} = useRequestQuery([RequestKeyEnum.stories, RequestKeyEnum.home], () => api.getStories());

	if (isError) {
		toast({
			type: "error",
			text:
				request.error ||
				"Não foi possível carregar as histórias. Por favor, recarregue a página.",
		});
		return null;
	}

	if (!stories) {
		return null;
	}

	return (
		<Wrapper>
			<div>
				{stories.map((story, index) => (
					<Story key={index} story={story} showChannel={true} />
				))}
			</div>
		</Wrapper>
	);
}
