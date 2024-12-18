USE co_wiki;

CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

USE co_wiki;

INSERT INTO admin_users (email) VALUES 
('zxcv828133@gmail.com'),
('pqpq7838@gmail.com');

USE co_wiki;

CREATE TABLE programming_concepts (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    language VARCHAR(50),               -- 프로그래밍 언어 (예: Python, JavaScript, Java)
    function_name VARCHAR(100),         -- 함수 또는 개념 이름 (예: len(), map())
    usage_example TEXT,                 -- 함수 사용 예제 코드
    description TEXT                    -- 함수 또는 개념에 대한 설명
);

INSERT INTO programming_concepts (language, function_name, usage_example, description) VALUES

('Python', 'abs()', 'print(abs(-10))  # 출력: 10', 'abs() 함수는 주어진 숫자의 절대값을 반환합니다.'),
('Python', 'aiter()', 'async def main():\n    async for i in aiter([1, 2, 3]):\n        print(i)', 'aiter() 함수는 비동기 이터레이터를 반환합니다.'),
('Python', 'all()', 'print(all([True, True, False]))  # 출력: False', 'all() 함수는 반복 가능한 객체의 모든 요소가 참일 경우에만 True를 반환합니다.'),
('Python', 'anext()', 'async def main():\n    iterator = aiter([1, 2, 3])\n    print(await anext(iterator))', 'anext() 함수는 비동기 이터레이터에서 다음 값을 반환합니다.'),
('Python', 'any()', 'print(any([True, False, False]))  # 출력: True', 'any() 함수는 반복 가능한 객체 중 하나라도 참이면 True를 반환합니다.'),
('Python', 'ascii()', 'print(ascii("파이썬"))  # 출력: "\\ud30c\\uc774\\c120"', 'ascii() 함수는 객체의 ASCII 표현을 반환합니다.'),
('Python', 'bin()', 'print(bin(10))  # 출력: "0b1010"', 'bin() 함수는 정수를 2진수 문자열로 변환합니다.'),
('Python', 'bool()', 'print(bool(0))  # 출력: False', 'bool() 함수는 값을 True 또는 False로 변환합니다.'),
('Python', 'breakpoint()', 'breakpoint()', 'breakpoint() 함수는 디버거를 호출하여 프로그램을 중지합니다.'),
('Python', 'bytearray()', 'ba = bytearray([65, 66, 67])\nprint(ba)  # 출력: bytearray(b"ABC")', 'bytearray() 함수는 변경 가능한 바이트 배열을 반환합니다.'),
('Python', 'bytes()', 'b = bytes([65, 66, 67])\nprint(b)  # 출력: b"ABC"', 'bytes() 함수는 불변의 바이트 객체를 반환합니다.'),
('Python', 'callable()', 'print(callable(len))  # 출력: True', 'callable() 함수는 객체가 호출 가능한지 여부를 반환합니다.'),
('Python', 'chr()', 'print(chr(97))  # 출력: "a"', 'chr() 함수는 유니코드 코드 포인트에 해당하는 문자를 반환합니다.'),
('Python', 'classmethod()', 'class MyClass:\n    @classmethod\n    def my_method(cls):\n        return cls\nprint(MyClass.my_method())', 'classmethod() 함수는 클래스를 첫 번째 인자로 받는 메서드를 정의합니다.'),
('Python', 'compile()', 'code = compile("print(123)", "<string>", "exec")\nexec(code)', 'compile() 함수는 소스 코드를 실행 가능한 코드 객체로 컴파일합니다.'),
('Python', 'complex()', 'z = complex(1, 2)\nprint(z)  # 출력: (1+2j)', 'complex() 함수는 복소수 객체를 생성합니다.'),
('Python', 'delattr()', 'class Test:\n    x = 10\nobj = Test()\ndelattr(obj, "x")\nprint(hasattr(obj, "x"))  # 출력: False', 'delattr() 함수는 객체에서 속성을 삭제합니다.'),
('Python', 'dict()', 'd = dict(a=1, b=2)\nprint(d)  # 출력: {"a": 1, "b": 2}', 'dict() 함수는 딕셔너리를 생성하는 함수입니다.'),
('Python', 'dir()', 'print(dir([]))  # 출력: 리스트 메서드 목록', 'dir() 함수는 객체의 속성과 메서드 리스트를 반환합니다.'),
('Python', 'divmod()', 'print(divmod(10, 3))  # 출력: (3, 1)', 'divmod() 함수는 두 숫자를 나누고 몫과 나머지를 튜플로 반환합니다.'),
('Python', 'enumerate()', 'for i, v in enumerate(["a", "b", "c"]):\n    print(i, v)', 'enumerate() 함수는 반복 가능한 객체를 인덱스와 함께 반환합니다.'),
('Python', 'eval()', 'print(eval("3 + 5"))  # 출력: 8', 'eval() 함수는 주어진 표현식을 실행하고 결과를 반환합니다.'),
('Python', 'exec()', 'exec("x = 5")\nprint(x)', 'exec() 함수는 주어진 코드를 실행합니다.'),
('Python', 'filter()', 'print(list(filter(lambda x: x > 5, [3, 6, 8, 2])))  # 출력: [6, 8]', 'filter() 함수는 함수의 조건을 만족하는 요소만을 반환합니다.'),
('Python', 'float()', 'print(float("3.14"))  # 출력: 3.14', 'float() 함수는 문자열이나 숫자를 부동 소수점 숫자로 변환합니다.'),
('Python', 'format()', 'print(format(123, "06"))  # 출력: "000123"', 'format() 함수는 문자열을 포맷팅합니다.'),
('Python', 'frozenset()', 'fs = frozenset([1, 2, 3, 2])\nprint(fs)  # 출력: frozenset({1, 2, 3})', 'frozenset() 함수는 불변의 집합 객체를 생성합니다.'),
('Python', 'getattr()', 'class MyClass:\n    x = 5\nobj = MyClass()\nprint(getattr(obj, "x", "Not found"))  # 출력: 5', 'getattr() 함수는 객체의 속성을 반환하며, 속성이 없으면 기본값을 반환합니다.'),
('Python', 'globals()', 'x = 10\nprint(globals()["x"])  # 출력: 10', 'globals() 함수는 현재 전역 심볼 테이블을 딕셔너리로 반환합니다.'),
('Python', 'hasattr()', 'class MyClass:\n    x = 10\nobj = MyClass()\nprint(hasattr(obj, "x"))  # 출력: True', 'hasattr() 함수는 객체에 해당 속성이 있는지 여부를 반환합니다.'),
('Python', 'hash()', 'print(hash("hello"))  # 출력: (해시 값)', 'hash() 함수는 객체의 해시 값을 반환합니다. 이 값은 딕셔너리에서 키로 사용할 수 있는 불변형 객체들에 대해 고유합니다.'),
('Python', 'help()', 'help(len)', 'help() 함수는 파이썬의 내장 도움말 시스템을 호출하여 주어진 객체에 대한 설명서를 제공합니다.'),
('Python', 'hex()', 'print(hex(255))  # 출력: "0xff"', 'hex() 함수는 정수를 16진수 문자열로 변환합니다.'),
('Python', 'id()', 'x = 10\nprint(id(x))  # 출력: (객체의 고유 ID)', 'id() 함수는 객체의 고유 식별자를 반환합니다. 이 값은 객체의 메모리 주소를 나타냅니다.'),
('Python', 'input()', 'name = input("Enter your name: ")\nprint(f"Hello, {name}")', 'input() 함수는 사용자로부터 입력을 받아 문자열로 반환합니다.'),
('Python', 'int()', 'print(int("42"))  # 출력: 42', 'int() 함수는 문자열이나 숫자를 정수로 변환합니다.'),
('Python', 'isinstance()', 'print(isinstance(5, int))  # 출력: True', 'isinstance() 함수는 객체가 특정 클래스의 인스턴스인지 확인합니다.'),
('Python', 'issubclass()', 'class A: pass\nclass B(A): pass\nprint(issubclass(B, A))  # 출력: True', 'issubclass() 함수는 클래스가 다른 클래스의 서브클래스인지 확인합니다.'),
('Python', 'iter()', 'lst = [1, 2, 3]\nit = iter(lst)\nprint(next(it))  # 출력: 1', 'iter() 함수는 반복 가능한 객체에서 이터레이터를 반환합니다.'),
('Python', 'len()', 'my_list = [1, 2, 3, 4]\nprint(len(my_list))  # 출력: 4', 'len() 함수는 시퀀스형 객체(리스트, 문자열 등)의 길이를 반환합니다.'),
('Python', 'list()', 'print(list("abc"))  # 출력: ["a", "b", "c"]', 'list() 함수는 반복 가능한 객체를 리스트로 변환합니다.'),
('Python', 'locals()', 'def func():\n    a = 10\n    print(locals())\nfunc()  # 출력: {"a": 10}', 'locals() 함수는 현재 지역 심볼 테이블을 딕셔너리로 반환합니다.'),
('Python', 'map()', 'print(list(map(str.upper, ["apple", "banana"])))  # 출력: ["APPLE", "BANANA"]', 'map() 함수는 주어진 함수로 처리된 이터레이터를 반환합니다.'),
('Python', 'max()', 'print(max([1, 2, 3, 4]))  # 출력: 4', 'max() 함수는 반복 가능한 객체 중에서 가장 큰 값을 반환합니다.'),
('Python', 'memoryview()', 'b = bytearray("abc", "utf-8")\nmv = memoryview(b)\nprint(mv[0])  # 출력: 97', 'memoryview() 함수는 바이트 데이터를 직접 조작할 수 있는 메모리 뷰 객체를 반환합니다.'),
('Python', 'min()', 'print(min([1, 2, 3, 4]))  # 출력: 1', 'min() 함수는 반복 가능한 객체 중에서 가장 작은 값을 반환합니다.'),
('Python', 'next()', 'it = iter([1, 2, 3])\nprint(next(it))  # 출력: 1', 'next() 함수는 이터레이터의 다음 항목을 반환합니다. 더 이상 항목이 없으면 StopIteration 예외를 발생시킵니다.'),
('Python', 'object()', 'class MyClass(object):\n    pass\nobj = MyClass()\nprint(isinstance(obj, object))  # 출력: True', 'object() 함수는 모든 클래스의 최상위 클래스입니다.'),
('Python', 'oct()', 'print(oct(8))  # 출력: "0o10"', 'oct() 함수는 정수를 8진수 문자열로 변환합니다.'),
('Python', 'open()', 'with open("test.txt", "w") as f:\n    f.write("Hello, World!")', 'open() 함수는 파일을 열고, 파일 객체를 반환합니다.'),
('Python', 'ord()', 'print(ord("A"))  # 출력: 65', 'ord() 함수는 문자의 유니코드 코드 포인트를 반환합니다.'),
('Python', 'pow()', 'print(pow(2, 3))  # 출력: 8', 'pow() 함수는 두 숫자의 거듭제곱 결과를 반환합니다.'),
('Python', 'print()', 'print("Hello, World!")  # 출력: Hello, World!', 'print() 함수는 인자로 전달된 값을 출력합니다.'),
('Python', 'property()', 'class C:\n    def __init__(self, x):\n        self._x = x\n    @property\n    def x(self):\n        return self._x\nc = C(5)\nprint(c.x)', 'property() 함수는 클래스 속성에 접근할 때 사용됩니다.'),
('Python', 'range()', 'for i in range(5):\n    print(i)  # 출력: 0, 1, 2, 3, 4', 'range() 함수는 정수 시퀀스를 생성하여 반복문에서 자주 사용됩니다.'),
('Python', 'repr()', 'print(repr("Hello"))  # 출력: \'Hello\'', 'repr() 함수는 객체의 "개발자용" 문자열 표현을 반환합니다. 주로 디버깅용으로 사용됩니다.'),
('Python', 'reversed()', 'print(list(reversed([1, 2, 3])))  # 출력: [3, 2, 1]', 'reversed() 함수는 주어진 시퀀스를 역순으로 반환하는 이터레이터를 생성합니다.'),
('Python', 'round()', 'print(round(3.14159, 2))  # 출력: 3.14', 'round() 함수는 주어진 숫자를 지정된 소수점 자리로 반올림합니다.'),
('Python', 'set()', 's = set([1, 2, 2, 3])\nprint(s)  # 출력: {1, 2, 3}', 'set() 함수는 고유한 요소만을 포함하는 집합을 생성합니다.'),
('Python', 'setattr()', 'class MyClass:\n    x = 5\nobj = MyClass()\nsetattr(obj, "x", 10)\nprint(obj.x)  # 출력: 10', 'setattr() 함수는 객체의 속성 값을 설정합니다.'),
('Python', 'slice()', 's = slice(1, 5)\nprint([0, 1, 2, 3, 4, 5][s])  # 출력: [1, 2, 3, 4]', 'slice() 함수는 슬라이싱 객체를 생성하여 시퀀스에서 특정 범위의 항목에 접근할 때 사용됩니다.'),
('Python', 'sorted()', 'numbers = [4, 2, 1, 3]\nprint(sorted(numbers))  # 출력: [1, 2, 3, 4]', 'sorted() 함수는 주어진 반복 가능한 객체의 정렬된 리스트를 반환합니다.'),
('Python', 'staticmethod()', 'class MyClass:\n    @staticmethod\n    def static_method():\n        return "Hello"\nprint(MyClass.static_method())  # 출력: "Hello"', 'staticmethod() 함수는 클래스의 정적 메서드를 정의합니다. 인스턴스화 없이 클래스에서 직접 호출할 수 있습니다.'),
('Python', 'str()', 'print(str(123))  # 출력: "123"', 'str() 함수는 객체를 문자열로 변환합니다.'),
('Python', 'sum()', 'print(sum([1, 2, 3]))  # 출력: 6', 'sum() 함수는 주어진 반복 가능한 객체의 모든 항목의 합을 반환합니다.'),
('Python', 'super()', 'class Parent:\n    def greet(self):\n        print("Hello from Parent")\nclass Child(Parent):\n    def greet(self):\n        super().greet()\n        print("Hello from Child")\nChild().greet()', 'super() 함수는 자식 클래스에서 부모 클래스의 메서드를 호출할 때 사용됩니다.'),
('Python', 'tuple()', 'print(tuple([1, 2, 3]))  # 출력: (1, 2, 3)', 'tuple() 함수는 반복 가능한 객체를 튜플로 변환합니다.'),
('Python', 'type()', 'print(type(123))  # 출력: <class \'int\'>', 'type() 함수는 객체의 타입을 반환하거나 새로운 클래스를 정의할 때 사용됩니다.'),
('Python', 'vars()', 'class MyClass:\n    def __init__(self):\n        self.x = 5\nobj = MyClass()\nprint(vars(obj))  # 출력: {"x": 5}', 'vars() 함수는 객체의 __dict__ 속성을 반환하여 객체의 속성들을 딕셔너리로 제공합니다.'),
('Python', 'zip()', 'print(list(zip([1, 2, 3], ["a", "b", "c"])))  # 출력: [(1, "a"), (2, "b"), (3, "c")]', 'zip() 함수는 여러 반복 가능한 객체의 요소들을 묶어 튜플로 반환합니다.');