const GenerateId = require("generate-id");
const generate = new GenerateId();

export const make_id = function(){
    return generate.generate({
        length : 23,
        include  : ["upper", "down", "numbers"],
        add : {
            before : "q1s_",
        }
    })
}