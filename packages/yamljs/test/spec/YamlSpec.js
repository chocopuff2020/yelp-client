// Generated by CoffeeScript 1.10.0
var YAML, examplePath, ref, url;

if (typeof YAML === "undefined" || YAML === null) {
  YAML = require('../../src/Yaml');
}

describe('Parsed YAML Collections', function() {
  it('can be simple sequence', function() {
    return expect(YAML.parse("- apple\n- banana\n- carrot")).toEqual(['apple', 'banana', 'carrot']);
  });
  it('can be nested sequences', function() {
    return expect(YAML.parse("-\n - foo\n - bar\n - baz")).toEqual([['foo', 'bar', 'baz']]);
  });
  it('can be mixed sequences', function() {
    return expect(YAML.parse("- apple\n-\n - foo\n - bar\n - x123\n- banana\n- carrot")).toEqual(['apple', ['foo', 'bar', 'x123'], 'banana', 'carrot']);
  });
  it('can be deeply nested sequences', function() {
    return expect(YAML.parse("-\n -\n  - uno\n  - dos")).toEqual([[['uno', 'dos']]]);
  });
  it('can be simple mapping', function() {
    return expect(YAML.parse("foo: whatever\nbar: stuff")).toEqual({
      foo: 'whatever',
      bar: 'stuff'
    });
  });
  it('can be sequence in a mapping', function() {
    return expect(YAML.parse("foo: whatever\nbar:\n - uno\n - dos")).toEqual({
      foo: 'whatever',
      bar: ['uno', 'dos']
    });
  });
  it('can be nested mappings', function() {
    return expect(YAML.parse("foo: whatever\nbar:\n fruit: apple\n name: steve\n sport: baseball")).toEqual({
      foo: 'whatever',
      bar: {
        fruit: 'apple',
        name: 'steve',
        sport: 'baseball'
      }
    });
  });
  it('can be mixed mapping', function() {
    return expect(YAML.parse("foo: whatever\nbar:\n -\n   fruit: apple\n   name: steve\n   sport: baseball\n - more\n -\n   python: rocks\n   perl: papers\n   ruby: scissorses")).toEqual({
      foo: 'whatever',
      bar: [
        {
          fruit: 'apple',
          name: 'steve',
          sport: 'baseball'
        }, 'more', {
          python: 'rocks',
          perl: 'papers',
          ruby: 'scissorses'
        }
      ]
    });
  });
  it('can have mapping-in-sequence shortcut', function() {
    return expect(YAML.parse("- work on YAML.py:\n   - work on Store")).toEqual([
      {
        'work on YAML.py': ['work on Store']
      }
    ]);
  });
  it('can have unindented sequence-in-mapping shortcut', function() {
    return expect(YAML.parse("allow:\n- 'localhost'\n- '%.sourceforge.net'\n- '%.freepan.org'")).toEqual({
      allow: ['localhost', '%.sourceforge.net', '%.freepan.org']
    });
  });
  it('can merge key', function() {
    return expect(YAML.parse("mapping:\n  name: Joe\n  job: Accountant\n  <<:\n    age: 38")).toEqual({
      mapping: {
        name: 'Joe',
        job: 'Accountant',
        age: 38
      }
    });
  });
  return it('can ignore trailing empty lines for smallest indent', function() {
    return expect(YAML.parse(" trailing: empty lines\n")).toEqual({
      trailing: 'empty lines'
    });
  });
});

describe('Parsed YAML Inline Collections', function() {
  it('can be simple inline array', function() {
    return expect(YAML.parse("---\nseq: [ a, b, c ]")).toEqual({
      seq: ['a', 'b', 'c']
    });
  });
  it('can be simple inline hash', function() {
    return expect(YAML.parse("---\nhash: { name: Steve, foo: bar }")).toEqual({
      hash: {
        name: 'Steve',
        foo: 'bar'
      }
    });
  });
  it('can be nested inline hash', function() {
    return expect(YAML.parse("---\nhash: { val1: \"string\", val2: { v2k1: \"v2k1v\" } }")).toEqual({
      hash: {
        val1: 'string',
        val2: {
          v2k1: 'v2k1v'
        }
      }
    });
  });
  return it('can be multi-line inline collections', function() {
    return expect(YAML.parse("languages: [ Ruby,\n             Perl,\n             Python ]\nwebsites: { YAML: yaml.org,\n            Ruby: ruby-lang.org,\n            Python: python.org,\n            Perl: use.perl.org }")).toEqual({
      languages: ['Ruby', 'Perl', 'Python'],
      websites: {
        YAML: 'yaml.org',
        Ruby: 'ruby-lang.org',
        Python: 'python.org',
        Perl: 'use.perl.org'
      }
    });
  });
});

describe('Parsed YAML Basic Types', function() {
  it('can be strings', function() {
    return expect(YAML.parse("---\nString")).toEqual('String');
  });
  it('can be double-quoted strings with backslashes', function() {
    return expect(YAML.parse("str:\n    \"string with \\\\ inside\"")).toEqual({
      str: 'string with \\ inside'
    });
  });
  it('can be single-quoted strings with backslashes', function() {
    return expect(YAML.parse("str:\n    'string with \\\\ inside'")).toEqual({
      str: 'string with \\\\ inside'
    });
  });
  it('can be double-quoted strings with line breaks', function() {
    return expect(YAML.parse("str:\n    \"string with \\n inside\"")).toEqual({
      str: 'string with \n inside'
    });
  });
  it('can be single-quoted strings with escaped line breaks', function() {
    return expect(YAML.parse("str:\n    'string with \\n inside'")).toEqual({
      str: 'string with \\n inside'
    });
  });
  it('can be double-quoted strings with line breaks and backslashes', function() {
    return expect(YAML.parse("str:\n    \"string with \\n inside and \\\\ also\"")).toEqual({
      str: 'string with \n inside and \\ also'
    });
  });
  it('can be single-quoted strings with line breaks and backslashes', function() {
    return expect(YAML.parse("str:\n    'string with \\n inside and \\\\ also'")).toEqual({
      str: 'string with \\n inside and \\\\ also'
    });
  });
  it('can have string characters in sequences', function() {
    return expect(YAML.parse("- What's Yaml?\n- It's for writing data structures in plain text.\n- And?\n- And what? That's not good enough for you?\n- No, I mean, \"And what about Yaml?\"\n- Oh, oh yeah. Uh.. Yaml for JavaScript.")).toEqual(["What's Yaml?", "It's for writing data structures in plain text.", "And?", "And what? That's not good enough for you?", "No, I mean, \"And what about Yaml?\"", "Oh, oh yeah. Uh.. Yaml for JavaScript."]);
  });
  it('can have indicators in strings', function() {
    return expect(YAML.parse("the colon followed by space is an indicator: but is a string:right here\nsame for the pound sign: here we have it#in a string\nthe comma can, honestly, be used in most cases: [ but not in, inline collections ]")).toEqual({
      'the colon followed by space is an indicator': 'but is a string:right here',
      'same for the pound sign': 'here we have it#in a string',
      'the comma can, honestly, be used in most cases': ['but not in', 'inline collections']
    });
  });
  it('can force strings', function() {
    return expect(YAML.parse("date string: !str 2001-08-01\nnumber string: !str 192\ndate string 2: !!str 2001-08-01\nnumber string 2: !!str 192")).toEqual({
      'date string': '2001-08-01',
      'number string': '192',
      'date string 2': '2001-08-01',
      'number string 2': '192'
    });
  });
  it('can be single-quoted strings', function() {
    return expect(YAML.parse("all my favorite symbols: '#:!/%.)'\na few i hate: '&(*'\nwhy do i hate them?: 'it''s very hard to explain'")).toEqual({
      'all my favorite symbols': '#:!/%.)',
      'a few i hate': '&(*',
      'why do i hate them?': 'it\'s very hard to explain'
    });
  });
  it('can be double-quoted strings', function() {
    return expect(YAML.parse("i know where i want my line breaks: \"one here\\nand another here\\n\"")).toEqual({
      'i know where i want my line breaks': "one here\nand another here\n"
    });
  });
  it('can be null', function() {
    return expect(YAML.parse("name: Mr. Show\nhosted by: Bob and David\ndate of next season: ~")).toEqual({
      'name': 'Mr. Show',
      'hosted by': 'Bob and David',
      'date of next season': null
    });
  });
  it('can be boolean', function() {
    return expect(YAML.parse("Is Gus a Liar?: true\nDo I rely on Gus for Sustenance?: false")).toEqual({
      'Is Gus a Liar?': true,
      'Do I rely on Gus for Sustenance?': false
    });
  });
  it('can be integers', function() {
    return expect(YAML.parse("zero: 0\nsimple: 12\none-thousand: 1,000\nnegative one-thousand: -1,000")).toEqual({
      'zero': 0,
      'simple': 12,
      'one-thousand': 1000,
      'negative one-thousand': -1000
    });
  });
  it('can be integers as map keys', function() {
    return expect(YAML.parse("1: one\n2: two\n3: three")).toEqual({
      1: 'one',
      2: 'two',
      3: 'three'
    });
  });
  it('can be floats', function() {
    return expect(YAML.parse("a simple float: 2.00\nlarger float: 1,000.09\nscientific notation: 1.00009e+3")).toEqual({
      'a simple float': 2.0,
      'larger float': 1000.09,
      'scientific notation': 1000.09
    });
  });
  it('can be time', function() {
    var iso8601Date, spaceSeparatedDate, withDatesToTime;
    iso8601Date = new Date(Date.UTC(2001, 12 - 1, 14, 21, 59, 43, 10));
    iso8601Date.setTime(iso8601Date.getTime() - 5 * 3600 * 1000);
    spaceSeparatedDate = new Date(Date.UTC(2001, 12 - 1, 14, 21, 59, 43, 10));
    spaceSeparatedDate.setTime(spaceSeparatedDate.getTime() - 5 * 3600 * 1000);
    withDatesToTime = function(input) {
      var key, res, val;
      res = {};
      for (key in input) {
        val = input[key];
        res[key] = Math.round(val.getTime() / 1000) * 1000;
      }
      return res;
    };
    return expect(withDatesToTime(YAML.parse("iso8601: 2001-12-14t21:59:43.10-05:00\nspace seperated: 2001-12-14 21:59:43.10 -05:00"))).toEqual(withDatesToTime({
      'iso8601': iso8601Date,
      'space seperated': spaceSeparatedDate
    }));
  });
  return it('can be date', function() {
    var aDate, withDatesToTime;
    aDate = new Date(Date.UTC(1976, 7 - 1, 31, 0, 0, 0, 0));
    withDatesToTime = function(input) {
      var key, res, val;
      return input;
      res = {};
      for (key in input) {
        val = input[key];
        res[key] = Math.round(val.getTime() / 1000) * 1000;
      }
      return res;
    };
    return expect(withDatesToTime(YAML.parse("date: 1976-07-31"))).toEqual(withDatesToTime({
      'date': aDate
    }));
  });
});

describe('Parsed YAML Blocks', function() {
  it('can be single ending newline', function() {
    return expect(YAML.parse("---\nthis: |\n    Foo\n    Bar")).toEqual({
      'this': "Foo\nBar\n"
    });
  });
  it('can be single ending newline with \'+\' indicator', function() {
    return expect(YAML.parse("normal: |\n  extra new lines not kept\n\npreserving: |+\n  extra new lines are kept\n\n\ndummy: value")).toEqual({
      'normal': "extra new lines not kept\n",
      'preserving': "extra new lines are kept\n\n\n",
      'dummy': 'value'
    });
  });
  it('can be multi-line block handling trailing newlines in function of \'+\', \'-\' indicators', function() {
    return expect(YAML.parse("clipped: |\n    This has one newline.\n\n\n\nsame as \"clipped\" above: \"This has one newline.\\n\"\n\nstripped: |-\n    This has no newline.\n\n\n\nsame as \"stripped\" above: \"This has no newline.\"\n\nkept: |+\n    This has four newlines.\n\n\n\nsame as \"kept\" above: \"This has four newlines.\\n\\n\\n\\n\"")).toEqual({
      'clipped': "This has one newline.\n",
      'same as "clipped" above': "This has one newline.\n",
      'stripped': 'This has no newline.',
      'same as "stripped" above': 'This has no newline.',
      'kept': "This has four newlines.\n\n\n\n",
      'same as "kept" above': "This has four newlines.\n\n\n\n"
    });
  });
  it('can be folded block in a sequence', function() {
    return expect(YAML.parse("---\n- apple\n- banana\n- >\n    can't you see\n    the beauty of yaml?\n    hmm\n- dog")).toEqual(['apple', 'banana', "can't you see the beauty of yaml? hmm\n", 'dog']);
  });
  it('can be folded block as a mapping value', function() {
    return expect(YAML.parse("---\nquote: >\n    Mark McGwire's\n    year was crippled\n    by a knee injury.\nsource: espn")).toEqual({
      'quote': "Mark McGwire's year was crippled by a knee injury.\n",
      'source': 'espn'
    });
  });
  it('can be folded block handling trailing newlines in function of \'+\', \'-\' indicators', function() {
    return expect(YAML.parse("clipped: >\n    This has one newline.\n\n\n\nsame as \"clipped\" above: \"This has one newline.\\n\"\n\nstripped: >-\n    This has no newline.\n\n\n\nsame as \"stripped\" above: \"This has no newline.\"\n\nkept: >+\n    This has four newlines.\n\n\n\nsame as \"kept\" above: \"This has four newlines.\\n\\n\\n\\n\"")).toEqual({
      'clipped': "This has one newline.\n",
      'same as "clipped" above': "This has one newline.\n",
      'stripped': 'This has no newline.',
      'same as "stripped" above': 'This has no newline.',
      'kept': "This has four newlines.\n\n\n\n",
      'same as "kept" above': "This has four newlines.\n\n\n\n"
    });
  });
  return it('can be the whole document as intented block', function() {
    return expect(YAML.parse("---\n  foo: \"bar\"\n  baz:\n    - \"qux\"\n    - \"quxx\"\n  corge: null")).toEqual({
      'foo': "bar",
      'baz': ['qux', 'quxx'],
      'corge': null
    });
  });
});

describe('Parsed YAML Comments', function() {
  it('can begin the document', function() {
    return expect(YAML.parse("# This is a comment\nhello: world")).toEqual({
      hello: 'world'
    });
  });
  it('can be less indented in mapping', function() {
    return expect(YAML.parse("parts:\n    a: 'b'\n    # normally indented comment\n    c: 'd'\n# less indented comment\n    e: 'f'")).toEqual({
      parts: {
        a: 'b',
        c: 'd',
        e: 'f'
      }
    });
  });
  it('can be less indented in sequence', function() {
    return expect(YAML.parse("list-header:\n  - item1\n#  - item2\n  - item3\n  # - item4")).toEqual({
      'list-header': ['item1', 'item3']
    });
  });
  it('can finish a line', function() {
    return expect(YAML.parse("hello: world # This is a comment")).toEqual({
      hello: 'world'
    });
  });
  return it('can end the document', function() {
    return expect(YAML.parse("hello: world\n# This is a comment")).toEqual({
      hello: 'world'
    });
  });
});

describe('Parsed YAML Aliases and Anchors', function() {
  it('can be simple alias', function() {
    return expect(YAML.parse("- &showell Steve\n- Clark\n- Brian\n- Oren\n- *showell")).toEqual(['Steve', 'Clark', 'Brian', 'Oren', 'Steve']);
  });
  return it('can be alias of a mapping', function() {
    return expect(YAML.parse("- &hello\n    Meat: pork\n    Starch: potato\n- banana\n- *hello")).toEqual([
      {
        Meat: 'pork',
        Starch: 'potato'
      }, 'banana', {
        Meat: 'pork',
        Starch: 'potato'
      }
    ]);
  });
});

describe('Parsed YAML Documents', function() {
  it('can have YAML header', function() {
    return expect(YAML.parse("--- %YAML:1.0\nfoo: 1\nbar: 2")).toEqual({
      foo: 1,
      bar: 2
    });
  });
  it('can have leading document separator', function() {
    return expect(YAML.parse("---\n- foo: 1\n  bar: 2")).toEqual([
      {
        foo: 1,
        bar: 2
      }
    ]);
  });
  return it('can have multiple document separators in block', function() {
    return expect(YAML.parse("foo: |\n    ---\n    foo: bar\n    ---\n    yo: baz\nbar: |\n    fooness")).toEqual({
      foo: "---\nfoo: bar\n---\nyo: baz\n",
      bar: "fooness\n"
    });
  });
});

describe('Dumped YAML Collections', function() {
  it('can be simple sequence', function() {
    return expect(YAML.parse("- apple\n- banana\n- carrot")).toEqual(YAML.parse(YAML.dump(['apple', 'banana', 'carrot'])));
  });
  it('can be nested sequences', function() {
    return expect(YAML.parse("-\n - foo\n - bar\n - baz")).toEqual(YAML.parse(YAML.dump([['foo', 'bar', 'baz']])));
  });
  it('can be mixed sequences', function() {
    return expect(YAML.parse("- apple\n-\n - foo\n - bar\n - x123\n- banana\n- carrot")).toEqual(YAML.parse(YAML.dump(['apple', ['foo', 'bar', 'x123'], 'banana', 'carrot'])));
  });
  it('can be deeply nested sequences', function() {
    return expect(YAML.parse("-\n -\n  - uno\n  - dos")).toEqual(YAML.parse(YAML.dump([[['uno', 'dos']]])));
  });
  it('can be simple mapping', function() {
    return expect(YAML.parse("foo: whatever\nbar: stuff")).toEqual(YAML.parse(YAML.dump({
      foo: 'whatever',
      bar: 'stuff'
    })));
  });
  it('can be sequence in a mapping', function() {
    return expect(YAML.parse("foo: whatever\nbar:\n - uno\n - dos")).toEqual(YAML.parse(YAML.dump({
      foo: 'whatever',
      bar: ['uno', 'dos']
    })));
  });
  it('can be nested mappings', function() {
    return expect(YAML.parse("foo: whatever\nbar:\n fruit: apple\n name: steve\n sport: baseball")).toEqual(YAML.parse(YAML.dump({
      foo: 'whatever',
      bar: {
        fruit: 'apple',
        name: 'steve',
        sport: 'baseball'
      }
    })));
  });
  it('can be mixed mapping', function() {
    return expect(YAML.parse("foo: whatever\nbar:\n -\n   fruit: apple\n   name: steve\n   sport: baseball\n - more\n -\n   python: rocks\n   perl: papers\n   ruby: scissorses")).toEqual(YAML.parse(YAML.dump({
      foo: 'whatever',
      bar: [
        {
          fruit: 'apple',
          name: 'steve',
          sport: 'baseball'
        }, 'more', {
          python: 'rocks',
          perl: 'papers',
          ruby: 'scissorses'
        }
      ]
    })));
  });
  it('can have mapping-in-sequence shortcut', function() {
    return expect(YAML.parse("- work on YAML.py:\n   - work on Store")).toEqual(YAML.parse(YAML.dump([
      {
        'work on YAML.py': ['work on Store']
      }
    ])));
  });
  it('can have unindented sequence-in-mapping shortcut', function() {
    return expect(YAML.parse("allow:\n- 'localhost'\n- '%.sourceforge.net'\n- '%.freepan.org'")).toEqual(YAML.parse(YAML.dump({
      allow: ['localhost', '%.sourceforge.net', '%.freepan.org']
    })));
  });
  return it('can merge key', function() {
    return expect(YAML.parse("mapping:\n  name: Joe\n  job: Accountant\n  <<:\n    age: 38")).toEqual(YAML.parse(YAML.dump({
      mapping: {
        name: 'Joe',
        job: 'Accountant',
        age: 38
      }
    })));
  });
});

describe('Dumped YAML Inline Collections', function() {
  it('can be simple inline array', function() {
    return expect(YAML.parse("---\nseq: [ a, b, c ]")).toEqual(YAML.parse(YAML.dump({
      seq: ['a', 'b', 'c']
    })));
  });
  it('can be simple inline hash', function() {
    return expect(YAML.parse("---\nhash: { name: Steve, foo: bar }")).toEqual(YAML.parse(YAML.dump({
      hash: {
        name: 'Steve',
        foo: 'bar'
      }
    })));
  });
  it('can be multi-line inline collections', function() {
    return expect(YAML.parse("languages: [ Ruby,\n             Perl,\n             Python ]\nwebsites: { YAML: yaml.org,\n            Ruby: ruby-lang.org,\n            Python: python.org,\n            Perl: use.perl.org }")).toEqual(YAML.parse(YAML.dump({
      languages: ['Ruby', 'Perl', 'Python'],
      websites: {
        YAML: 'yaml.org',
        Ruby: 'ruby-lang.org',
        Python: 'python.org',
        Perl: 'use.perl.org'
      }
    })));
  });
  return it('can be dumped empty sequences in mappings', function() {
    return expect(YAML.parse(YAML.dump({
      key: []
    }))).toEqual({
      key: []
    });
  });
});

describe('Dumped YAML Basic Types', function() {
  it('can be strings', function() {
    return expect(YAML.parse("---\nString")).toEqual(YAML.parse(YAML.dump('String')));
  });
  it('can be double-quoted strings with backslashes', function() {
    return expect(YAML.parse("str:\n    \"string with \\\\ inside\"")).toEqual(YAML.parse(YAML.dump({
      str: 'string with \\ inside'
    })));
  });
  it('can be single-quoted strings with backslashes', function() {
    return expect(YAML.parse("str:\n    'string with \\\\ inside'")).toEqual(YAML.parse(YAML.dump({
      str: 'string with \\\\ inside'
    })));
  });
  it('can be double-quoted strings with line breaks', function() {
    return expect(YAML.parse("str:\n    \"string with \\n inside\"")).toEqual(YAML.parse(YAML.dump({
      str: 'string with \n inside'
    })));
  });
  it('can be double-quoted strings with line breaks and backslashes', function() {
    return expect(YAML.parse("str:\n    \"string with \\n inside and \\\\ also\"")).toEqual(YAML.parse(YAML.dump({
      str: 'string with \n inside and \\ also'
    })));
  });
  it('can be single-quoted strings with line breaks and backslashes', function() {
    return expect(YAML.parse("str:\n    'string with \\n inside and \\\\ also'")).toEqual(YAML.parse(YAML.dump({
      str: 'string with \\n inside and \\\\ also'
    })));
  });
  it('can be single-quoted strings with escaped line breaks', function() {
    return expect(YAML.parse("str:\n    'string with \\n inside'")).toEqual(YAML.parse(YAML.dump({
      str: 'string with \\n inside'
    })));
  });
  it('can have string characters in sequences', function() {
    return expect(YAML.parse("- What's Yaml?\n- It's for writing data structures in plain text.\n- And?\n- And what? That's not good enough for you?\n- No, I mean, \"And what about Yaml?\"\n- Oh, oh yeah. Uh.. Yaml for JavaScript.")).toEqual(YAML.parse(YAML.dump(["What's Yaml?", "It's for writing data structures in plain text.", "And?", "And what? That's not good enough for you?", "No, I mean, \"And what about Yaml?\"", "Oh, oh yeah. Uh.. Yaml for JavaScript."])));
  });
  it('can have indicators in strings', function() {
    return expect(YAML.parse("the colon followed by space is an indicator: but is a string:right here\nsame for the pound sign: here we have it#in a string\nthe comma can, honestly, be used in most cases: [ but not in, inline collections ]")).toEqual(YAML.parse(YAML.dump({
      'the colon followed by space is an indicator': 'but is a string:right here',
      'same for the pound sign': 'here we have it#in a string',
      'the comma can, honestly, be used in most cases': ['but not in', 'inline collections']
    })));
  });
  it('can force strings', function() {
    return expect(YAML.parse("date string: !str 2001-08-01\nnumber string: !str 192\ndate string 2: !!str 2001-08-01\nnumber string 2: !!str 192")).toEqual(YAML.parse(YAML.dump({
      'date string': '2001-08-01',
      'number string': '192',
      'date string 2': '2001-08-01',
      'number string 2': '192'
    })));
  });
  it('can be single-quoted strings', function() {
    return expect(YAML.parse("all my favorite symbols: '#:!/%.)'\na few i hate: '&(*'\nwhy do i hate them?: 'it''s very hard to explain'")).toEqual(YAML.parse(YAML.dump({
      'all my favorite symbols': '#:!/%.)',
      'a few i hate': '&(*',
      'why do i hate them?': 'it\'s very hard to explain'
    })));
  });
  it('can be double-quoted strings', function() {
    return expect(YAML.parse("i know where i want my line breaks: \"one here\\nand another here\\n\"")).toEqual(YAML.parse(YAML.dump({
      'i know where i want my line breaks': "one here\nand another here\n"
    })));
  });
  it('can be null', function() {
    return expect(YAML.parse("name: Mr. Show\nhosted by: Bob and David\ndate of next season: ~")).toEqual(YAML.parse(YAML.dump({
      'name': 'Mr. Show',
      'hosted by': 'Bob and David',
      'date of next season': null
    })));
  });
  it('can be boolean', function() {
    return expect(YAML.parse("Is Gus a Liar?: true\nDo I rely on Gus for Sustenance?: false")).toEqual(YAML.parse(YAML.dump({
      'Is Gus a Liar?': true,
      'Do I rely on Gus for Sustenance?': false
    })));
  });
  it('can be integers', function() {
    return expect(YAML.parse("zero: 0\nsimple: 12\none-thousand: 1,000\nnegative one-thousand: -1,000")).toEqual(YAML.parse(YAML.dump({
      'zero': 0,
      'simple': 12,
      'one-thousand': 1000,
      'negative one-thousand': -1000
    })));
  });
  it('can be integers as map keys', function() {
    return expect(YAML.parse("1: one\n2: two\n3: three")).toEqual(YAML.parse(YAML.dump({
      1: 'one',
      2: 'two',
      3: 'three'
    })));
  });
  it('can be floats', function() {
    return expect(YAML.parse("a simple float: 2.00\nlarger float: 1,000.09\nscientific notation: 1.00009e+3")).toEqual(YAML.parse(YAML.dump({
      'a simple float': 2.0,
      'larger float': 1000.09,
      'scientific notation': 1000.09
    })));
  });
  it('can be time', function() {
    var iso8601Date, spaceSeparatedDate, withDatesToTime;
    iso8601Date = new Date(Date.UTC(2001, 12 - 1, 14, 21, 59, 43, 10));
    iso8601Date.setTime(iso8601Date.getTime() - 5 * 3600 * 1000);
    spaceSeparatedDate = new Date(Date.UTC(2001, 12 - 1, 14, 21, 59, 43, 10));
    spaceSeparatedDate.setTime(spaceSeparatedDate.getTime() - 5 * 3600 * 1000);
    withDatesToTime = function(input) {
      var key, res, val;
      res = {};
      for (key in input) {
        val = input[key];
        res[key] = Math.round(val.getTime() / 1000) * 1000;
      }
      return res;
    };
    return expect(withDatesToTime(YAML.parse("iso8601: 2001-12-14t21:59:43.10-05:00\nspace seperated: 2001-12-14 21:59:43.10 -05:00"))).toEqual(YAML.parse(YAML.dump(withDatesToTime({
      'iso8601': iso8601Date,
      'space seperated': spaceSeparatedDate
    }))));
  });
  return it('can be date', function() {
    var aDate, withDatesToTime;
    aDate = new Date(Date.UTC(1976, 7 - 1, 31, 0, 0, 0, 0));
    withDatesToTime = function(input) {
      var key, res, val;
      return input;
      res = {};
      for (key in input) {
        val = input[key];
        res[key] = Math.round(val.getTime() / 1000) * 1000;
      }
      return res;
    };
    return expect(withDatesToTime(YAML.parse("date: 1976-07-31"))).toEqual(YAML.parse(YAML.dump(withDatesToTime({
      'date': aDate
    }))));
  });
});

describe('Dumped YAML Blocks', function() {
  it('can be single ending newline', function() {
    return expect(YAML.parse("---\nthis: |\n    Foo\n    Bar")).toEqual(YAML.parse(YAML.dump({
      'this': "Foo\nBar\n"
    })));
  });
  it('can be single ending newline with \'+\' indicator', function() {
    return expect(YAML.parse("normal: |\n  extra new lines not kept\n\npreserving: |+\n  extra new lines are kept\n\n\ndummy: value")).toEqual(YAML.parse(YAML.dump({
      'normal': "extra new lines not kept\n",
      'preserving': "extra new lines are kept\n\n\n",
      'dummy': 'value'
    })));
  });
  it('can be multi-line block handling trailing newlines in function of \'+\', \'-\' indicators', function() {
    return expect(YAML.parse("clipped: |\n    This has one newline.\n\n\n\nsame as \"clipped\" above: \"This has one newline.\\n\"\n\nstripped: |-\n    This has no newline.\n\n\n\nsame as \"stripped\" above: \"This has no newline.\"\n\nkept: |+\n    This has four newlines.\n\n\n\nsame as \"kept\" above: \"This has four newlines.\\n\\n\\n\\n\"")).toEqual(YAML.parse(YAML.dump({
      'clipped': "This has one newline.\n",
      'same as "clipped" above': "This has one newline.\n",
      'stripped': 'This has no newline.',
      'same as "stripped" above': 'This has no newline.',
      'kept': "This has four newlines.\n\n\n\n",
      'same as "kept" above': "This has four newlines.\n\n\n\n"
    })));
  });
  it('can be folded block in a sequence', function() {
    return expect(YAML.parse("---\n- apple\n- banana\n- >\n    can't you see\n    the beauty of yaml?\n    hmm\n- dog")).toEqual(YAML.parse(YAML.dump(['apple', 'banana', "can't you see the beauty of yaml? hmm\n", 'dog'])));
  });
  it('can be folded block as a mapping value', function() {
    return expect(YAML.parse("---\nquote: >\n    Mark McGwire's\n    year was crippled\n    by a knee injury.\nsource: espn")).toEqual(YAML.parse(YAML.dump({
      'quote': "Mark McGwire's year was crippled by a knee injury.\n",
      'source': 'espn'
    })));
  });
  return it('can be folded block handling trailing newlines in function of \'+\', \'-\' indicators', function() {
    return expect(YAML.parse("clipped: >\n    This has one newline.\n\n\n\nsame as \"clipped\" above: \"This has one newline.\\n\"\n\nstripped: >-\n    This has no newline.\n\n\n\nsame as \"stripped\" above: \"This has no newline.\"\n\nkept: >+\n    This has four newlines.\n\n\n\nsame as \"kept\" above: \"This has four newlines.\\n\\n\\n\\n\"")).toEqual(YAML.parse(YAML.dump({
      'clipped': "This has one newline.\n",
      'same as "clipped" above': "This has one newline.\n",
      'stripped': 'This has no newline.',
      'same as "stripped" above': 'This has no newline.',
      'kept': "This has four newlines.\n\n\n\n",
      'same as "kept" above': "This has four newlines.\n\n\n\n"
    })));
  });
});

describe('Dumped YAML Comments', function() {
  it('can begin the document', function() {
    return expect(YAML.parse("# This is a comment\nhello: world")).toEqual(YAML.parse(YAML.dump({
      hello: 'world'
    })));
  });
  it('can finish a line', function() {
    return expect(YAML.parse("hello: world # This is a comment")).toEqual(YAML.parse(YAML.dump({
      hello: 'world'
    })));
  });
  return it('can end the document', function() {
    return expect(YAML.parse("hello: world\n# This is a comment")).toEqual(YAML.parse(YAML.dump({
      hello: 'world'
    })));
  });
});

describe('Dumped YAML Aliases and Anchors', function() {
  it('can be simple alias', function() {
    return expect(YAML.parse("- &showell Steve\n- Clark\n- Brian\n- Oren\n- *showell")).toEqual(YAML.parse(YAML.dump(['Steve', 'Clark', 'Brian', 'Oren', 'Steve'])));
  });
  return it('can be alias of a mapping', function() {
    return expect(YAML.parse("- &hello\n    Meat: pork\n    Starch: potato\n- banana\n- *hello")).toEqual(YAML.parse(YAML.dump([
      {
        Meat: 'pork',
        Starch: 'potato'
      }, 'banana', {
        Meat: 'pork',
        Starch: 'potato'
      }
    ])));
  });
});

describe('Dumped YAML Documents', function() {
  it('can have YAML header', function() {
    return expect(YAML.parse("--- %YAML:1.0\nfoo: 1\nbar: 2")).toEqual(YAML.parse(YAML.dump({
      foo: 1,
      bar: 2
    })));
  });
  it('can have leading document separator', function() {
    return expect(YAML.parse("---\n- foo: 1\n  bar: 2")).toEqual(YAML.parse(YAML.dump([
      {
        foo: 1,
        bar: 2
      }
    ])));
  });
  return it('can have multiple document separators in block', function() {
    return expect(YAML.parse("foo: |\n    ---\n    foo: bar\n    ---\n    yo: baz\nbar: |\n    fooness")).toEqual(YAML.parse(YAML.dump({
      foo: "---\nfoo: bar\n---\nyo: baz\n",
      bar: "fooness\n"
    })));
  });
});

url = typeof document !== "undefined" && document !== null ? (ref = document.location) != null ? ref.href : void 0 : void 0;

if (!(url != null) || url.indexOf('file://') === -1) {
  examplePath = 'spec/example.yml';
  if (typeof __dirname !== "undefined" && __dirname !== null) {
    examplePath = __dirname + '/example.yml';
  }
  describe('YAML loading', function() {
    it('can be done synchronously', function() {
      return expect(YAML.load(examplePath)).toEqual({
        "this": 'is',
        a: ['YAML', 'example']
      });
    });
    return it('can be done asynchronously', function(done) {
      return YAML.load(examplePath, function(result) {
        expect(result).toEqual({
          "this": 'is',
          a: ['YAML', 'example']
        });
        return done();
      });
    });
  });
}
