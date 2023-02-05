import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import api from "../../services/tuys";
import { RequestKeyEnum } from "../utils/enums";
import { Icons } from "../utils";
import { useRequestQuery } from "../../hooks";

export function Footer() {
	const [haveNewNotification, setHaveNewNotification] = useState(false);
	const { user } = useUserContext();
	const { data: notifications } = useRequestQuery(
		[RequestKeyEnum.notifications, user.username],
		() => api.getNotifications()
	);

	if (
		notifications &&
		notifications[0] &&
		!notifications[0].read &&
		!haveNewNotification
	) {
		setHaveNewNotification(true);
	}

	if (
		notifications &&
		((notifications[0]?.read && haveNewNotification) ||
			(notifications?.length === 0 && haveNewNotification))
	) {
		setHaveNewNotification(false);
	}

	return (
		<Wrapper>
			<Link to="/">
				<Icons type="home" />
			</Link>

			<Link to="/channels">
				<Icons type="channels" />
			</Link>

			<Link to="/ranking">
				<Icons type="ranking" />
			</Link>

			<Link to="/notifications">
				<Icons type="notification" />
				{haveNewNotification && <div></div>}
			</Link>

			<Link to="/me">
				<Icons type="me" />
			</Link>

			<Link to="/settings">
				<Icons type="settings" />
			</Link>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 100%;
	height: 65px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 2em;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 2;
	box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.25);
	background-color: ${(props) => props.theme.colors.background};

	a {
		position: relative;

		> div {
			width: 8px;
			height: 8px;
			border-radius: 50px;
			position: absolute;
			top: 0;
			right: 0;
			background-color: ${(props) => props.theme.colors.red};
		}
	}

	svg {
		height: 23px;
		width: 23px;
		color: ${(props) => props.theme.colors.secundary};
		cursor: pointer;
	}

	@media (min-width: 501px) {
		display: none;
	}

	@media (max-width: 300px) {
		padding: 0 1em;
	}
`;
