const BASE_URL = "http://localhost:3000/";

export const fetchHeroes = async (page: number) => {
  try {
    const result = await fetch(`${BASE_URL}superhero?page=${page}`);

    const heroes = await result.json();

    return heroes;
  } catch (error) {
    console.log(error);
    throw new Error("Error while reading heroes");
  }
};

export const fetchPagesCount = async () => {
  try {
    const result = await fetch(`${BASE_URL}superhero/pages`);

    return await result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error while reading pages count");
  }
};

export const fetchOneHero = async (id: number) => {
  try {
    const result = await fetch(`${BASE_URL}superhero/${id}`);
    return await result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error while reading hero");
  }
};

export const createHero = async (body: FormData) => {
  try {
    const result = await fetch(`${BASE_URL}superhero`, {
      method: "POST",
      body,
    });

    return await result.json();
  } catch (error) {
    console.log(error);

    throw new Error("Error while creating hero");
  }
};

export const updateHero = async (
  id: number,
  body: FormData,
  deleteImagesIds?: number[]
) => {
  try {
    const result = await fetch(`${BASE_URL}superhero/${id}`, {
      method: "PATCH",
      body,
    });

    if (deleteImagesIds) {
      const deletedPhotosResult = await fetch(`${BASE_URL}superhero/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteImagesIds: deleteImagesIds }),
      });

      if (!deletedPhotosResult.ok) {
        throw new Error("Error while deleting photos");
      }
    }

    return await result.json();
  } catch (error) {
    console.log(error);

    throw new Error("Error while updating hero");
  }
};
