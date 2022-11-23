import { render, screen } from "@testing-library/react";
import event from "@testing-library/user-event";
import { App } from "./App";
import "@testing-library/jest-dom";
import { ErrorMessage } from "./components/errorMessage/ErrorMessage";
import { CustomInput } from "./components/Input/Input";
import { LatestLaunchItem } from "./components/LatestLaunchItem/LatestLaunchItem";

describe("App", () => {
    test("should render custom form", () => {
        render(<App />);
        const submitButton = screen.getByRole("button", {
            name: "Submit",
        });
        const customInput = screen.getByRole("textbox");
        expect(submitButton).toBeInTheDocument();
        expect(customInput).toBeInTheDocument();
    });
    test("should click the submit button successfully after typing at least 24 chars", async () => {
        const onSubmit = jest.fn();
        render(<CustomInput getLaunchById={onSubmit} />);

        const customInput = screen.getByRole("textbox");
        const submitButton = screen.getByRole("button", {
            name: "Submit",
        });

        await event.type(customInput, "asdfrtyuikmnbvr554321234sdf");
        await event.click(submitButton);
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    test("An error message should show up searching an invalid id", async () => {
        render(<App />);
        render(<ErrorMessage error="err" />);

        const customInput = screen.getByRole("textbox");
        const submitButton = screen.getByRole("button", {
            name: "Submit",
        });

        await event.type(customInput, "asdfrtyuikmnbvr554321234sdf");
        await event.click(submitButton);

        const errorMessage = screen.getByRole("heading", {
            level: 4,
        });
        expect(errorMessage).toBeInTheDocument();
    });

    test("latest launches", async () => {
        render(
            <LatestLaunchItem
                responseData={[
                    { name: "rocket", id: "asdfrtyuikmnbvr554321234sdf" },
                    { name: "rocket1", id: "asdfrtyuikmnbvr554321234s" },
                    { name: "rocke2", id: "asdfrtyuikmnbv54321234sdf" },
                ]}
            />
        );
        const launchList = await screen.findAllByRole("listitem");
        expect(launchList).toHaveLength(3);
    });
});
