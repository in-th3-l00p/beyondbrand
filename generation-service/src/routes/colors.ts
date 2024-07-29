import Router from "express";
import {body, matchedData, query} from "express-validator";
import validate from "../middleware/validate";
import openai from "../utils/openai";
import logger from "../utils/logger";
import auth0 from "../middleware/auth0";

const router = Router();

router.post(
    "/",
    auth0,
    body("name").isString().isLength({min: 1, max: 255}).optional(),
    body("description").isString().isLength({min: 1, max: 500}).optional(),
    query("colors").isInt({ min: 1, max: 6 }),
    validate,
    async (req, res) => {
        const { name, description, colors } = matchedData(req);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            response_format: { type: "json_object" },
            temperature: 1.0,
            max_tokens: 50,
            messages: [
                {
                    role: "system",
                    content:
                        "Generate a color scheme for a brand." +
                        `Make sure you generate ${colors} colors, and Use the brand's information if given. ` +
                        "Generate the response as JSON, the colors being an array of strings stored on the \"colors\" key ." +
                        "Make sure the colors are in hex format (ex: #FFFFFF). " +
                        "Make sure you don't mess up the array with any float values." +
                        "Color Theory 101: Understanding and Using Color in Design\n" +
                        "As children, we spend time in school learning about the basics of color. But few of us learn about the fundamentals of color theory.\n" +
                        "Color theory can be a valuable tool to not only help us understand more about the world around us but also to create harmonious designs or decorate our homes.\n" +
                        "\n" +
                        "In this post, we’ll explain what color theory is, why it matters, the different color models, and how you can more effectively use color in your life.\n" +
                        "\n" +
                        "What Is Color?\n" +
                        "We spend so much time around color that we often assume we know what it is without really thinking about its definition. At its core, color is perception. Our eyes see something, and the data sent from our eyes to our brains interprets it as a particular color.\n" +
                        "\n" +
                        "Objects reflect light in different combinations of wavelengths. Our brains pick up on these wavelength combinations, interpreting them as a phenomenon known as color.\n" +
                        "\n" +
                        "Color is the place where our brain and the universe meet.\n" +
                        "—Paul Klee\n" +
                        "\n" +
                        "What Is Color Theory?\n" +
                        "Color theory is the art and science of using color. It explains how humans perceive color (both physically and psychologically) and how colors mix, match, and contrast with one another. It also factors in the messages that colors communicate.\n" +
                        "\n" +
                        "On a more practical level, color theory also explains how specific colors can be replicated in printing, computers, art, and more – it’s an overarching, multifaceted field.\n" +
                        "\n" +
                        "At its simplest, color theory creates a logical structure for something we deal with every day but might not always fully understand or have the proper terminology to discuss in detail.\n" +
                        "\n" +
                        "Basically, color theory is the set of best practices for picking colors together for harmonious designs and contextual color combinations.\n" +
                        "\n" +
                        "Why Is It So Important?\n" +
                        "No matter what capacity you work with color in your daily life, having a working understanding of color theory will always come in handy.\n" +
                        "\n" +
                        "Color is vital to making a product recognizable and appealing in branding and marketing. It sends an instant message about what your brand identity is. If your branding is light, diffuse lavender, that sends a very different message than if your branding is all black.\n" +
                        "\n" +
                        "We live in fast times, and the message must be transmitted instantly and effectively. When you consider that 90% of the information sent to the brain is visual, color theory becomes essential to convey the right message and influence people.\n" +
                        "\n" +
                        "Even if you’re not in sales or marketing, color theory is still critical. It’ll make your art and design more effective and help you develop a better eye for color. And even if you’re not an artist, designer, or entrepreneur, knowing more about color will help you talk about it competently in all areas of your life.\n" +
                        "\n" +
                        "Color Models\n" +
                        "There are three different color models. Here’s what you need to know about each of them.\n" +
                        "\n" +
                        "RGB (Red, Green, Blue)\n" +
                        "TVs, projectors, and electronic screens use the RGB model with red, green, and blue as their primary colors.\n" +
                        "\n" +
                        "While the RYB model involves mixing pigments, the RGB model involves mixing light to create other colors. This makes RGB an additive, rather than subtractive, color model. Instead of starting with white and subtracting color away from it, RGB begins with black and applies red, green, and blue light sources of varying intensities.\n" +
                        "\n" +
                        "The more light you add, the brighter the color becomes. If you mix all three colors of light in equal amounts, you’ll get pure, white light.\n" +
                        "\n" +
                        "CMYK (Cyan, Magenta, Yellow, and Key – or Black)\n" +
                        "Any color you see on a physical printed surface uses the CMYK color model. Unlike RGB, CMYK is a subtractive color mixing model. Colors are produced by subtracting light from paper by adding pigmented ink to a white surface.\n" +
                        "\n" +
                        "And unlike RGB, CMYK uses different primary colors because cyan, magenta, yellow, and black let printers produce a wider variety of colors on paper.\n" +
                        "\n" +
                        "Keep in mind that although you’d use CMYK to create printed materials, if you used CMYK instead of RGB to post your logo on a screen, the color wouldn’t look right when posted online or used on your website.\n" +
                        "\n" +
                        "RYB (Red, Yellow, Blue)\n" +
                        "This is the color model you probably learned as a child, mixing finger paints in school. Today, it’s known as “traditional” color theory and continues to be used by artists and designers to mix paints and create color palettes. The primary colors are red, yellow, and blue.\n" +
                        "\n" +
                        "This is a subtractive color mixing model. This means that you start with the white of a canvas or piece of paper, then subtract the light reflected by the paper by adding pigment color (paint, crayon, marker, etc.) to it.\n" +
                        "\n" +
                        "Color Wheel Theory\n" +
                        "Sir Isaac Newton mapped the color spectrum into a color circle in 1666. Today, we call this circle the color wheel, which has 12 basic colors. It organizes the three primary colors, three secondary colors, and six tertiary colors (or intermediate colors) into a gradient wheel, showing their relation to one another in an easy-to-understand visual model.\n" +
                        "\n" +
                        "Today, there are three color wheels – one for each color model. But the relationships between the colors on the color wheel remain the same, no matter which wheel you’re using.\n" +
                        "\n" +
                        "Artists and designers refer to the color wheel when choosing color schemes for any project that involves color.\n" +
                        "\n" +
                        "Primary, Secondary, and Tertiary Colors\n" +
                        "The color wheel is organized into primary, secondary, and tertiary colors.\n" +
                        "\n" +
                        "Primary colors are the three main building blocks of the color wheel – the colors that can’t be created by mixing other hues.\n" +
                        "Red\n" +
                        "Green\n" +
                        "Blue\n" +
                        "Secondary colors consist of two primary colors mixed in equal amounts.\n" +
                        "Red + blue = Magenta\n" +
                        "Green + red = Yellow\n" +
                        "Blue + green = Cyan\n" +
                        "Tertiary colors are created by mixing secondary and primary colors to create new hues.\n" +
                        "Green + yellow = Chartreuse\n" +
                        "Green + cyan = Spring green\n" +
                        "Blue + cyan = Azure\n" +
                        "Blue + magenta = Violet\n" +
                        "Red + magenta = Rose\n" +
                        "Red + yellow = Orange\n" +
                        "Hue, Value, and Chroma\n" +
                        "After mastering the color wheel, it’s time to learn about hue, value, and chroma. These are important terms because they allow us to talk more in-depth about colors and color theory.\n" +
                        "\n" +
                        "Hue is the pure form of any color, its position on the color wheel. It refers to the color family as in red, blue, and green. It’s what we usually mean when we use the word “color.”\n" +
                        "Value refers to how pure the color is – whether it has shades, tints, or tones added to it to alter its appearance.\n" +
                        "Chroma refers to how pale or saturated a given color is.\n" +
                        "Shade, Tint, and Tone\n" +
                        "Shade, tint, and tone create variations of hues on the color wheel. They’re essential to understanding color theory because, in the real world, we aren’t simply working with mixing hues. We’re also working on mixing hues with neutrals.\n" +
                        "\n" +
                        "Shade: To create a shade of an existing color, add black to a given hue. For example, red and black make burgundy, a darker shade of red.\n" +
                        "Tint: To create a tint of a particular color, add white to it.\n" +
                        "Tone: To change a color’s tone, add gray. This darkens the original hue while making the color more subtle and less intense.\n" +
                        "Color Temperature\n" +
                        "You can draw a straight line through the center of the color wheel and separate the warm colors from the cool colors.\n" +
                        "\n" +
                        "Warm colors: Reds, yellows, and oranges. Associated with energy, brightness, and action.\n" +
                        "Cool colors: Blues, greens, and purples. Instill calm, peace, and serenity.\n" +
                        "Every specific color has its own warm or cool undertones. There are cool reds and warm greens, for example. Always pay attention to a color’s undertones. The best way to learn to identify that is to practice!\n" +
                        "\n" +
                        "Color Harmony\n" +
                        "Color harmonies are color arrangements that are pleasing to the eye. They create a sense of cohesion. They’re what makes a color scheme “work.” Here’s a quick primer on the main color harmonies to get you started.\n" +
                        "\n" +
                        "Monochromatic: Includes a single hue with varying shades and tints. Produces a consistent look and feel but lacks color contrast.\n" +
                        "Complementary: Uses two colors from opposite sides of the color wheel, like red and green. Creates high contrast but can be exhausting to look at.\n" +
                        "Split-Complementary: Includes one dominant color and the two colors directly next to the dominant color’s complement. More nuance than complementary but harder to balance.\n" +
                        "Analogous: Uses colors directly adjacent to each other on the color wheel – for example, red, orange, and yellow. Use the 60-30-10 rule with this harmony.\n" +
                        "Triadic: Consists of three colors evenly spaced around the color wheel. Produces bright and dynamic designs but can look overwhelming if done wrong.\n" +
                        "Square: Uses four colors, all equidistant on the color wheel. Creates tons of contrast but should be balanced with one dominant color.\n" +
                        "Tetradic: Also called the rectangular color scheme. Similar to the square color scheme but with hues closer to each other on the color wheel"
                },
                {
                    role: "user",
                    content:
                        (name ? "Name: " + name + "\n" : "") +
                        (description ? "Description: " + description + "\n" : "")
                }
            ]
        });

        logger.info(`Color generation with ${response.usage?.total_tokens}`);
        return res.json(
            JSON.parse(response.choices[0].message.content!)
        );
    })

router.post(
    "/prompted",
    body("prompt").isString().isLength({min: 1, max: 500}).optional(),
    query("colors").isInt({ min: 1, max: 6 }),
    validate,
    async (req, res) => {
        const { prompt, colors } = matchedData(req);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            response_format: { type: "json_object" },
            temperature: 1.0,
            max_tokens: 50,
            messages: [
                {
                    role: "system",
                    content:
                        "Generate a color scheme for a brand." +
                        `Make sure you generate ${colors} colors, and use the query if given. ` +
                        "Generate the response as JSON, the colors being an array of strings stored on the \"colors\" key ." +
                        "Make sure the colors are in hex format (ex: #FFFFFF). " +
                        "Make sure you don't mess up the array with any float values."
                },
                {
                    role: "user",
                    content:
                        (prompt ? "Query: " + prompt + "\n" : "")
                }
            ]
        });

        logger.info(`Color generation with ${response.usage?.total_tokens}`);
        res.json(JSON.parse(response.choices[0].message.content!));
    })

export default router;