import styled from "styled-components";
import {  useParams } from "react-router-dom";
import api from "../../services/tuys";
import { useRequestQuery, useToast } from "../hooks";
import { RequestKeyEnum } from "../utils/enums";
import { Icons } from "../utils";
import { PageStyle } from "./PageStyle";
import { Stories } from "../stories/Stories";

export function User() {
	const toast = useToast();
	const params = useParams();
	const userId = Number(params.userId) || null;

	const {
		isError,
		isSuccess,
		data: user,
		...request
	} = useRequestQuery([RequestKeyEnum.user, userId], getUserData);

	if (isError) {
		toast({
			type: "error",
			text:
				request.error ||
				"Não foi possível buscar os dados. Por favor, recarregue a página",
		});
		return null;
	}

	if (!user) {
		return null;
	}

	function getUserData() {
		if (!userId || isNaN(userId) || userId <= 0) {
			throw new Error(
				JSON.stringify({
					message: "Id de usuário inválido!",
					status: 400,
				})
			);
		}
		return api.getUserData(userId);
	}

	return (
		<PageStyle>
			<PageStyle.Header
				color={user.rankColor}
				avatar={user.avatar}
				username={user.username}
			/>

			<PageStyle.Sections>
				<PageStyle.User>
					{!user.isUser && user.isFollowing && (
						<Follow>
							<Icons type="unfollow" />
							<span>Parar de seguir</span>
						</Follow>
					)}

					{!user.isUser && !user.isFollowing && (
						<Follow>
							<Icons type="follow" />
							<span>Seguir</span>
						</Follow>
					)}

					<p>
						<Icons type="me" />
						<b>Sobre mim</b>
					</p>
					<span>{user.about}</span>
					<p>
						<Icons type="rank" />
						<b>Rank: </b>
						<span style={{ color: user.rankColor }}>{user.rankName}</span>
					</p>
					<p>
						<Icons type="createdStories" />
						<b>Total de contos criados: </b>
						<span>{user.createdStories}</span>
					</p>
					<p>
						<Icons type="follower" />
						<b>Seguidores: </b>
						<span>{user.followers}</span>
					</p>
					<p>
						<Icons type="following" />
						<b>Segue: </b>
						<span>{user.following}</span>
					</p>
					<p>
						<Icons type="status" />
						<b>Status: </b>
						<span
							style={{
								color: user.status === "BANNED" ? "#f70000" : "#04ee04",
							}}
						>
							{user.status === "BANNED" ? "banido" : "ativo"}
						</span>
					</p>
				</PageStyle.User>

				<Stories path="user" />
			</PageStyle.Sections>
		</PageStyle>
	);
}

const Follow = styled.div`
	&& {
		display: flex;
		align-items: center;
		margin-top: 10px;
		color: ${(props) => props.theme.colors.blue};
		font-weight: 700;

		svg {
			margin-right: 10px;
			cursor: pointer;
		}

		span {
			cursor: pointer;
		}
	}
`;
