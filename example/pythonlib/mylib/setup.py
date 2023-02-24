from setuptools import setup, find_packages
from os import path

version = "0.0.1"

this_directory = path.abspath(path.dirname(__file__))
with open(path.join(this_directory, "README.md"), encoding="utf-8") as f:
    long_description = f.read()

setup(
    name="mylib",
    packages=find_packages(),
    version=version,
    description="An example dummy library",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="me",
    author_email="me@example.com",
    url="https://github.com/me/mylib",
    download_url="https://github.com/me/mylib/releases/tag/" + version,
    keywords=[],
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.10",
    ],
    install_requires=["docutils", "docstring-parser"],
    zip_safe=False,
)
