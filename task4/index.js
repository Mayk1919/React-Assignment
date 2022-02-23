let bemBuild = "";
const bem = {
    block: (block) => {
        bemBuild = block;
        return {
            element: (element) => {
                bemBuild += "_" + element;
                return {
                    modifier: (modifier) => {
                        bemBuild += "--" + modifier;
                        return {
                            build: () => {
                                return bemBuild;
                            },
                        };
                    },
                };
            },
            modifier: (modifier) => {
                bemBuild += "--" + modifier;
                return {
                    build: () => {
                        return bemBuild;
                    },
                };
            },
        };
    },
};
try {
    console.log(
        `${bem.block("list").element("item").modifier("active").build()}`
    );
    console.log(`${bem.block("list").modifier("active").build()}`);
    console.log(`${modifier("active").build()}`);
} catch (err) {
    alert("Build should have a build method");
}
