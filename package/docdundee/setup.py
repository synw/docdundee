from setuptools import setup, find_packages
from os import path

version = "0.0.3"

this_directory = path.abspath(path.dirname(__file__))
with open(path.join(this_directory, "README.md"), encoding="utf-8") as f:
    long_description = f.read()

setup(
    name="docdundee",
    packages=find_packages(),
    version=version,
    description="Parse docstrings into json",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="synw",
    author_email="synwe@yahoo.com",
    url="https://github.com/synw/docdundee/package/pdocdundee",
    download_url="https://github.com/synw/docdundee/releases/tag/" + version,
    keywords=["documentation", "docstrings"],
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.10",
    ],
    install_requires=["docutils", "docstring-parser"],
    zip_safe=False,
)
