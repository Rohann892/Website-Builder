const extractJSON = (text) => {
    if (!text) {
        return;
    }

    const cleaned = text.replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
        return null;
    }

    const jsonString = cleaned.slice(firstBrace, lastBrace + 1);

    try {
        return JSON.parse(jsonString)
    } catch (error) {
        console.error("error in json parsing", error);
    }

}

export default extractJSON