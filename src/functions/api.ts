const BASE_URL = "http://localhost:3000/";

export const fetchHeroes = async (page: number) => {
  try {
    const result = await fetch(`${BASE_URL}superhero?page=${page}`);

    const heroes = await result.json();

    return heroes;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const fetchPagesCount = async () => {
  try {
    const result = await fetch(`${BASE_URL}superhero/pages`);

    return await result.json();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const fetchOneHero = async (id: number) => {
  try {
    const result = await fetch(`${BASE_URL}superhero/${id}`);
    return await result.json();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
