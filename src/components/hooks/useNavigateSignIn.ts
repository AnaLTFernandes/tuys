import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../contexts";
import { toast } from "../utils";

function useNavigateSignIn() {
	const { theme } = useThemeContext();
	const navigate = useNavigate();

	return () => {
		toast({
			theme: theme.name,
			type: "warning",
			text: "Sessão encerrada.",
		});
		navigate("/sign-in");
	};
}

export { useNavigateSignIn };
